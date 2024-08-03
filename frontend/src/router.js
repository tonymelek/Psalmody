import { createRouter, createWebHistory } from "vue-router";
import Sunday from '../src/containers/Sunday.vue';
import Slides from '../src/containers/Slides.vue';


const routes = [
    { path: '/', component: Sunday },
    { path: '/slides', component: Slides },
]

export const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
})