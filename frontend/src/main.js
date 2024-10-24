import { createApp } from 'vue'
import './style.css';
import 'animate.css'
import App from './App.vue'
import { router } from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');

if ("serviceWorker" in navigator) {
    // Register a service worker hosted at the root of the
    // site using the default scope.
    navigator.serviceWorker.register("./sw.js").then(
        (registration) => {
            console.log("Service worker registration succeeded");
        },
        (error) => {
            console.error(`Service worker registration failed: ${error}`);
        },
    );
} else {
    console.error("Service workers are not supported.");
}
