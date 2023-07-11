import Hyperswarm, { PeerInfo } from "hyperswarm";
import DHT from "@hyperswarm/dht-relay";
import Stream from "@hyperswarm/dht-relay/ws";
import { Buffer } from "buffer";

class BrowserP2P {
  dht;
  swarm;
  sockets: Map<string, Stream> = new Map<string, Stream>();
  address: string;
  public constructor(seed: string, userID: number) {
    let ws = new WebSocket("wss://dht1-relay.leet.ar:49443/");
    this.dht = new DHT(new Stream(true, ws));
    // this.dht.keyPair(Buffer.alloc(32).fill(seed));
    this.swarm = new Hyperswarm({
      dht: this.dht,
      seed: Buffer.alloc(32).fill(seed),
    });
    this.address = Buffer.from(this.swarm.keyPair.publicKey).toString("hex");
    console.log("Address", this.address);

    this.swarm.on("connection", (conn: Stream, info: PeerInfo) => {
      let key = Buffer.from(info.publicKey).toString("hex");
      this.sockets.set(key, conn);
      console.log("Connection!");
      conn.on("close", (c) => {
        let deleted = this.sockets.delete(key);
        console.log("CLOSE", c, deleted);
      });
    });

    const connTopic = Buffer.alloc(32).fill(userID.toString()); // A topic must be 32 bytes
    const discovery = this.swarm.join(connTopic, {
      server: true,
      client: true,
    });
  }
}

export default BrowserP2P;
