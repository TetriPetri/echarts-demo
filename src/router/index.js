import { createRouter, createWebHistory } from 'vue-router';
import SieveAnalysisOrganism from '../components/organisms/SieveAnalysisOrganism.vue';
import GraphsPage from '../pages/GraphsPage.vue';

const routes = [
  { path: '/', component: SieveAnalysisOrganism },
  { path: '/graphs', component: GraphsPage }, // <-- new route
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
