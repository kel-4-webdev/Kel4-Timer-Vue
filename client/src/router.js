import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/historys/:timer_id",
      name: "History",
      component: () => import("App")
    }
  ]
});