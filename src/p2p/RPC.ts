import BrowserP2P from "./BrowserP2P";
import Graph from "./Graph";

export class RpcMethod {
  method: string;
  data?: any;
  isPartOfState: boolean;
}

class Rpc {
  graph: Graph;
  p2p: BrowserP2P;

  //helpers
  syncBiggestDataLength = 0;
  syncInit = false;

  constructor(graph: Graph, p2p: BrowserP2P) {
    this.graph = graph;
    this.p2p = p2p;
  }
  public executeMethod(rpcMethod: RpcMethod) {
    switch (rpcMethod.method) {
      case "MERGE_GRAPH": // data -- [adr,graph (stringified)]
        if (
          !Array.isArray(rpcMethod.data) ||
          typeof rpcMethod.data[0] != "string" ||
          typeof rpcMethod.data[1] != "string"
        )
          throw new Error("RPC METHOD - JOING_GAME - invalid data");
        let otherGraph = Graph.deepCopyFromGraphString(rpcMethod.data[1]);
        console.log("MERGE GRAPH - OTHER GRAPH", otherGraph);
        this.graph.mergeGraphs(otherGraph);
        this.graph.insertEdge(this.p2p.getPublicAddress(), rpcMethod.data[0]);
        break;
      default:
        throw new Error("Invalid RPC Method");
        break;
    }
  }
}

export default Rpc;
