import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import EditAddress from "./views/EditAddress.vue";
import Directions from "./views/Directions.vue";
import Shared from "./views/Shared.vue";
import About from "./views/About.vue";
import NotFound from "./views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/cadastro",
    name: "register",
    component: Register
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: EditAddress
  },
  {
    path: "/compartilhado/:id",
    name: "shared",
    component: Shared
  },
  {
    path: "/endereco/:id",
    name: "directions",
    component: Directions
  },
  {
    path: "/sobre",
    name: "about",
    component: About
  },
  {
    path: "*",
    name: "404",
    component: NotFound
  }
];

export default routes;
