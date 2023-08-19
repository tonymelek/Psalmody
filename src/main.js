import { createApp } from 'vue'
import './style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'animate.css'
import App from './App.vue'
import {router} from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');
