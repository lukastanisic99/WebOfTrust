import React, { Component } from "react";
import { useLocation, Route, Switch } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

import sidebarImage from "assets/img/sidebar-3.jpg";

import BrowserP2P from "../p2p/BrowserP2P";
import Account from "../p2p/Account";
import Graph from "../p2p/Graph";

function Admin() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);
  const acc = Account.getAccount();
  let p2p = null;
  if (acc) {
    p2p = new BrowserP2P(acc.seed, acc.userID);
    console.log("ADMIN pubKey ---> ", p2p.getPublicAddress());
    acc.setPublicKey(p2p.getPublicAddress());
  }
  // if (p2p) p2p.setGraph(graph);
  const [graphTriggerUpdate, triggerGraphUpdate] = React.useState(1);
  const graph = Graph.getGraph();
  p2p.init(graph);
  graph.setStateUpdateCallback(triggerGraphUpdate);
  console.log("GRAPH!!!!!!!!!!!!", graph);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/user") {
        console.log("Admin - props ::", prop, routes);
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => (
              <prop.component {...props} acc={acc} graph={graph} p2p={p2p} />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);
  return (
    <>
      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Switch>{getRoutes(routes)}</Switch>
          </div>
          <Footer />
        </div>
      </div>
      {/* <FixedPlugin
        hasImage={hasImage}
        setHasImage={() => setHasImage(!hasImage)}
        color={color}
        setColor={(color) => setColor(color)}
        image={image}
        setImage={(image) => setImage(image)}
      /> */}
    </>
  );
}

export default Admin;
