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
      return this.to === other.to || this.to === other.from;
    }
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
    let nodes = [];
    for (let i = 0; i < graphObj.nodes.length; i++) {
      let n = graphObj.nodes[i];
      nodes.push(new Node(n.id, n.name, n.userID, n.metadata));
    }
    let edges = [];
    for (let i = 0; i < graphObj.edges.length; i++) {
      let e = graphObj.edges[i];
      edges.push(new Edge(e.from, e.to));
    }
    graph = Object.assign(graph, nodes);
    return Object.assign(graph, edges);
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
    this.edges.push(new Edge(from, to));
    this.persistGraph();
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
      if (!found) {
        let o = other.edges[i];
        this.insertEdge(o.from, o.to);
      }
    }
  }
}

export default Graph;
