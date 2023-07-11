export class Node {
  public id: string;
  public name: string;
  public userID: number;
  public metadata: Object;
  constructor(pubKey: string, name: string, userID: number, metadata: Object) {
    this.id = pubKey;
    this.name = name;
    this.userID = userID;
    this.metadata = metadata;
  }
}
export class Edge {
  public from: string;
  public to: string;
  constructor(from: string, to: string) {
    this.from = from;
    this.to = to;
  }
}
class Graph {
  public nodes: Node[] = [];
  public edges: Edge[] = [];

  public insertNode(
    pubKey: string,
    name: string,
    userID: number,
    metadata: Object
  ) {
    this.nodes.push(new Node(pubKey, name, userID, metadata));
  }

  public insertEdge(from: string, to: string) {
    this.edges.push(new Edge(from, to));
  }
}
export default Graph;
