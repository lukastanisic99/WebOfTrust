/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "layouts/Admin.js";
import Signup from "views/Signup";

import Account from "./p2p/Account";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/user" render={(props) => <AdminLayout {...props} />} />
      <Route path="/signup" render={(props) => <Signup {...props} />} />
      {/* <Redirect from="/" to="/admin/dashboard" /> */}
      {Account.getAccount() ? (
        <Redirect from="/" to="/user/dashboard" />
      ) : (
        <Redirect from="/" to="/signup" />
      )}
      {/* <Redirect from="/" to="/signup" /> */}
    </Switch>
  </BrowserRouter>
);
