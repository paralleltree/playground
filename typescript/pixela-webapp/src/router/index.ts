import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import AuthenticationForm from "../views/AuthenticationForm.vue"
import Graphs from "../views/Graphs.vue";
import NewGraph from "../views/NewGraph.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    redirect: "/auth",
    // component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/auth",
    name: "Authentication",
    component: AuthenticationForm,
  },
  {
    path: "/graphs",
    name: "Graphs",
    component: Graphs,
    props: true
  },
  {
    path: "/graph/new",
    name: "NewGraph",
    component: NewGraph,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
