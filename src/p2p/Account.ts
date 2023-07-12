class Account {
  public name: string;
  public seed: string;
  public userID: number;
  public metadata: Object;
  public publicKey: string;

  constructor(name: string, seed?: string) {
    this.name = name;
    this.seed =
      seed ||
      [...Array(32)].map(() => (~~(Math.random() * 36)).toString(36)).join("");
    this.userID = Math.floor(Math.random() * 1000000);
    this.metadata = {};
  }
  public persistAccount() {
    localStorage.setItem("account", JSON.stringify(this));
  }
  public static clearAccount() {
    localStorage.removeItem("account");
    localStorage.removeItem("graph");
  }
  public static getAccount(): Account {
    let acc = JSON.parse(localStorage.getItem("account"));
    if (!acc) return null;
    return Object.assign(new Account("doesn't matter"), acc);
  }
  public setPublicKey(publicKey: string) {
    this.publicKey = publicKey;
    this.persistAccount();
  }
}

export default Account;
