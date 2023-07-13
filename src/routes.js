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
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import Signup from "views/Signup";

const dashboardRoutes = [
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-alien-33",
  //   component: Upgrade,
  //   layout: "/user",
  // },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/user",
  },
  {
    path: "/dashboard",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/user",
  },
  {
    path: "/dashboard",
    name: "Wallet Managment",
    icon: "fas fa-wallet",
    component: UserProfile,
    layout: "/user",
  },
  {
    path: "/dashboard",
    name: "Chats",
    icon: "far fa-comments",
    component: UserProfile,
    layout: "/user",
  },
  {
    path: "/dashboard",
    name: "Dating",
    icon: "fas fa-heart",
    component: Typography,
    layout: "/user",
  },
  {
    path: "/dashboard",
    name: "Taxi",
    icon: "fas fa-car-side",
    component: Icons,
    layout: "/user",
  },
  {
    path: "/dashboard",
    name: "Marketplace",
    icon: "fas fa-store",
    component: Icons,
    layout: "/user",
  },
  {
    path: "/dashboard",
    name: "Storage",
    icon: "fas fa-database",
    component: Icons,
    layout: "/user",
  },
];

export default dashboardRoutes;
