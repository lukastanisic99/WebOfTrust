import Hyperswarm, { PeerInfo } from "hyperswarm";
import DHT from "@hyperswarm/dht-relay";
import Stream from "@hyperswarm/dht-relay/ws";
import { Buffer } from "buffer";
import Graph from "./Graph";
import Rpc, { RpcMethod } from "./RPC";
class BrowserP2P {
  dht;
  swarm;
  sockets: Map<string, Stream> = new Map<string, Stream>();
  address: string;
  rpc: Rpc;
  userID: number;
  public constructor(seed: string, userID: number) {
    // this.rpc = new Rpc(graph, this);
    this.userID = userID;
    let ws = new WebSocket("wss://dht1-relay.leet.ar:49443/");
    this.dht = new DHT(new Stream(true, ws));
    // this.dht.keyPair(Buffer.alloc(32).fill(seed));
    try {
      this.swarm = new Hyperswarm({
        dht: this.dht,
        seed: Buffer.alloc(32).fill(seed),
      });
      this.address = Buffer.from(this.swarm.keyPair.publicKey).toString("hex");
      console.log("Address", this.address);
    } catch (e) {
      console.log("P2P Hyperswarm ERROR", e);
    }
  }
  public init(graph: Graph) {
    this.rpc = new Rpc(graph, this);
    this.swarm.on("connection", (conn: Stream, info: PeerInfo) => {
      let key = Buffer.from(info.publicKey).toString("hex");
      this.sockets.set(key, conn);
      console.log("Connection!", key);
      conn.on("data", (data) => {
        data = Buffer.from(data).toString();
        let rpcMethod: RpcMethod = JSON.parse(data);
        console.log("Received RPC", data);
        this.executeMethod(rpcMethod);
      });
      conn.on("close", (c) => {
        let deleted = this.sockets.delete(key);
        console.log("CLOSE", c, deleted);
      });
      this.broadcast({
        method: "MERGE_GRAPH",
        data: [this.getPublicAddress(), JSON.stringify(this.rpc.graph)],
        isPartOfState: false,
      });
    });
    this.connectToTopic(this.userID.toString(), true);
  }
  public connectToTopic(topic: string, server = false) {
    try {
      // const connTopic = Buffer.alloc(32).fill(userID.toString()); // A topic must be 32 bytes
      const connTopic = Buffer.alloc(32).fill(topic); // A topic must be 32 bytes
      const discovery = this.swarm.join(connTopic, {
        server: server,
        client: true,
      });
    } catch (e) {
      console.log("P2P - connection ERROR ", e);
    }
  }

  public getPublicAddress(): string {
    return this.address;
  }
  public getUserID(): number {
    return this.userID;
  }
  public broadcast(rpcMethod: RpcMethod) {
    let data = JSON.stringify(rpcMethod);
    console.log("Broadcast RPC", data);
    for (let socket of this.sockets.values()) {
      socket.write(data);
    }
  }
  public sendToConnection(rpcMethod: RpcMethod, conn) {
    let data = JSON.stringify(rpcMethod);
    console.log("SEND RPC", data);
    conn.write(data);
  }
  public executeMethod(rpcMethod: RpcMethod) {
    console.log(
      "############# ",
      JSON.stringify(rpcMethod),
      " #################"
    );
    this.rpc.executeMethod(rpcMethod);
  }
  public broadcastAndExecuteMethod(rpcMethod: RpcMethod) {
    this.broadcast(rpcMethod);
    this.executeMethod(rpcMethod);
  }
  // public setGraph(graph: Graph) {
  //   this.graph = graph;
  // }
}

export default BrowserP2P;
