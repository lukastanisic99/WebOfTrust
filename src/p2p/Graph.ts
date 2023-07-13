import Account from "./Account";
export class Node {
  public id: string;
  public name: string;
  public userID: number;
  public metadata: Object;
  constructor(
    pubKey: string,
    name: string,
    userID: number,
    metadata: Object = {}
  ) {
    this.id = pubKey;
    this.name = name;
    this.userID = userID;
    this.metadata = metadata;
  }

  isEqual(other: Node) {
    return this.id === other.id;
  }
}
export class Edge {
  public from: string;
  public to: string;
  constructor(from: string, to: string) {
    this.from = from;
    this.to = to;
  }
  public isEqual(other: Edge): boolean {
    if (this.from === other.from || this.from === other.to) {
      if (this.to === other.to || this.to === other.from) {
        // console.log("Edges isEQUAL", this, other, true);
        return true;
      }
    }
    // console.log("Edges isEQUAL", this, other, false);
    return false;
  }
}
class Graph {
  public nodes: Node[] = [];
  public edges: Edge[] = [];
  public stateUpdateCallback: Function;

  public static deepCopyFromGraphString(graphString: string): Graph {
    console.log("DeepCopy GraphString", graphString);
    let graphObj = JSON.parse(graphString);
    console.log("DeepCopy GraphObj", graphObj);
    let graph = new Graph();
    for (let i = 0; i < graphObj.nodes.length; i++) {
      let n = graphObj.nodes[i];
      graph.nodes.push(
        Object.assign(new Node(n.id, n.name, n.userID, n.metadata), n)
      );
    }
    for (let i = 0; i < graphObj.edges.length; i++) {
      let e = graphObj.edges[i];
      if (graph.verifyEdgePartOfGraph(e.from, e.to))
        graph.edges.push(new Edge(e.from, e.to));
    }
    return graph;
  }
  public static getGraph(): Graph {
    let g = localStorage.getItem("graph");
    let graph = g ? Graph.deepCopyFromGraphString(g) : g;
    let acc = Account.getAccount();
    console.log("GRAPH - getGraph - account", acc);
    if (graph) return Object.assign(new Graph(), graph);
    if (!graph && !acc) return null;
    if (!graph) {
      let g = new Graph();
      g.insertNode(acc.publicKey, acc.name, acc.userID, acc.metadata, {
        selected: {
          height: 30,
          fill: "#00aa00",
          stroke: null,
        },
        normal: {
          height: 20,
          fill: "#00aa00",
          stroke: null,
        },
        hovered: {
          height: 30,
          fill: "#00aa00",
          stroke: null,
        },
      });
      //   setInterval(() => {
      //     g.insertNode(
      //       [...Array(32)]
      //         .map(() => (~~(Math.random() * 36)).toString(36))
      //         .join(""),
      //       "A",
      //       123,
      //       {}
      //     );
      //     console.log("INTERVAL GRAPH ----->>", g);
      //   }, 2000);
      return g;
    }
  }

  public insertNode(
    pubKey: string,
    name: string,
    userID: number,
    metadata: Object,
    otherObjAtributes: Object = {}
  ) {
    this.nodes.push(
      Object.assign(new Node(pubKey, name, userID, metadata), otherObjAtributes)
    );
    this.persistGraph();
  }

  public insertEdge(from: string, to: string) {
    let edge = new Edge(from, to);
    if (this.doesEdgeExists(edge)) return;
    this.edges.push(edge);
    this.persistGraph();
  }
  private doesEdgeExists(edge: Edge) {
    for (let i = 0; i < this.edges.length; i++) {
      if (this.edges[i].isEqual(edge)) return true;
    }
    return false;
  }

  public persistGraph() {
    if (typeof this.stateUpdateCallback === "function") {
      console.log("UPDATE GRAPH - set state");
      //   this.stateUpdateCallback(Object.assign(new Graph(), this));
      this.stateUpdateCallback(Math.floor(Math.random() * 1000000));
    }
    localStorage.setItem("graph", JSON.stringify(this));
    // this.stateUpdateCallback(this);
  }
  public setStateUpdateCallback(callback: any) {
    this.stateUpdateCallback = callback;
  }

  public mergeGraphs(other: Graph) {
    //merge nodes
    for (let i = 0; i < other.nodes.length; i++) {
      let found = false;
      for (let j = 0; j < this.nodes.length; j++) {
        if (other.nodes[i].isEqual(this.nodes[j])) {
          found = true;
          break;
        }
      }
      if (!found) {
        let o = other.nodes[i];
        console.log("MERGING NODE ->", o);
        this.insertNode(o.id, o.name, o.userID, o.metadata);
      }
    }
    //merge edges
    for (let i = 0; i < other.edges.length; i++) {
      let found = false;
      for (let j = 0; j < this.edges.length; j++) {
        if (other.edges[i].isEqual(this.edges[j])) {
          found = true;
          break;
        }
      }
      if (
        !found &&
        this.verifyEdgePartOfGraph(other.edges[i].from, other.edges[i].to)
      ) {
        let o = other.edges[i];
        console.log("MERGING EDGE ->", o);
        this.insertEdge(o.from, o.to);
      }
    }
  }
  public getTotalPeers(): number {
    return this.nodes.length;
  }
  public getTotalDirectConnections(peerAddress: string): number {
    let cnt = 0;
    this.edges.forEach((e) => {
      if (e.from === peerAddress || e.to === peerAddress) {
        cnt++;
      }
    });
    return cnt;
  }
  private verifyEdgePartOfGraph(from: string, to: string): boolean {
    let found = false;
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].id === from) {
        found = true;
        break;
      }
    }
    if (!found) return false;
    found = false;
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].id === to) {
        found = true;
        break;
      }
    }
    return found;
  }
}

export default Graph;
