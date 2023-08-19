import { createRouter, createWebHashHistory } from "vue-router";
import Sunday from '../src/containers/Sunday.vue';
import Slides from '../src/containers/Slides.vue';


const routes = [
    { path: '/', component: Sunday },
    { path: '/slides', component: Slides },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})