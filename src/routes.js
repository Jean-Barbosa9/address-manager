import Home from "./views/Home.vue";
import Directions from "./views/Directions.vue";
import NotFound from "./views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/directions/:id",
    name: "directions",
    component: Directions
  },
  {
    path: "*",
    name: "404",
    component: NotFound
  }
];

export default routes;
