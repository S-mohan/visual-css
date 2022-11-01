import { VCWidgets } from "@/types";
import { createRouter, createWebHistory } from "vue-router";
import Layout from "../layout/Index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Layout,
      redirect: "/grid-layout",
      children: [
        {
          path: "grid-layout",
          name: VCWidgets.GRID_LAYOUT,
          component: () => import("../views/grid-layout/Index.vue"),
        },
        {
          path: "arrow-generator",
          name: VCWidgets.ARROW_GENERATOR,
          component: () => import("../views/arrow-generator/Index.vue"),
        },
      ],
    },
  ],
});

export default router;
