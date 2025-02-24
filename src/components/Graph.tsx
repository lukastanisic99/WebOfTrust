import * as React from "react";
import AnyChart from 'anychart-react'
import Graph, { Node, Edge } from '../p2p/Graph';
const GraphComponent: React.FC<{graph:Graph}> = ({graph}) => {
  return (
    <div>
      <AnyChart type="graph" data={graph} nodes={{
        labels: {
          enabled: true,
          format: '{%name}',
          fontColor: '#000',
          fontSize:16
        },
        tooltip: {
            enabled: true,
            format: 'Discovery ID: {%userID}\nMetadata: {%metadata}',
          }
      }}
        width={'100%'}
        height={300}
      ></AnyChart>
    </div>
  );
};

const nodes_JSON = {
"nodes": [
{
    "id": "1",
    size: 50, label: 'Node A', customData: 'Custom data for A',
    customObject: JSON.stringify({a:1,b:"c"},null,2)
},
{
  "id": "2"
},
{
  "id": "3"
},
{
  "id": "4"
},
{
  "id": "5"
},
{
  "id": "6"
},
{
  "id": "7"
},
{
  "id": "8",
  // data:'asdasdasdas',
  normal:   { 
            height: 20,
            fill: "#00aa00",
            stroke: null
           },
  hovered:   { 
            height: 30,
            fill: "#00aa00",
            stroke: null
  },
  selected:   { 
            height: 30,
            fill: "#00aa00",
            stroke: null
           }
           

},
{
  "id": "9"
},
{
  "id": "10"
},
{
  "id": "11"
},
{
  "id": "12"
},
{
  "id": "13"
},
{
  "id": "14"
}
],
"edges": [
{ "from": "1", "to": "5" },
{ "from": "4", "to": "5" },
//{ "from": "5", "to": "8" },
{ "from": "9", "to": "10" },
//{ "from": "10", "to": "8" },
{ "from": "14", "to": "10" },
{ "from": "2", "to": "6" },
{ "from": "3", "to": "6" },
{ "from": "7", "to": "6" },
//{ "from": "6", "to": "8" },
{ "from": "12", "to": "11" },
//{ "from": "11", "to": "8" },
{ "from": "13", "to": "11" }

]
};
// let graph2 = new Graph();
// nodes_JSON.nodes.map((node) => {
//   graph2.insertNode(node.id,node.label,123,node.customObject)
// })
// nodes_JSON.edges.map((edge) => {
//   graph2.insertEdge(edge.from,edge.to)
// })

export default GraphComponent;
