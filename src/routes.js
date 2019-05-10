import Home from "./views/Home.vue";
import Directions from "./views/Directions.vue";

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
  }
];

export default routes;
