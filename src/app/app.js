import { createApp } from 'vue';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import VueChartkick from 'vue-chartkick';
import 'chartkick/chart.js'

import store from '../store.js'
import routes from '../routes.js';

const app_store = createStore(store);
const app_router = createRouter({
	routes: routes,
	history: createWebHistory()
})

createApp(App)
	.use(app_store)
	.use(app_router)
	.use(VueChartkick)
	.mount('#app');