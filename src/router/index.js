import { createWebHistory, createRouter } from "vue-router";
import Home from "../components/Receipt.vue";

const routes = [
  {
    path: "/constancia-de-pago/:id/detalles",
    name: "Recibo",
    component: Home,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;