import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import VueCalendarHeatmap from 'vue3-calendar-heatmap'

import './assets/css/style.css';
import App from './App.vue';

// Create a new Pinia instance
const pinia = createPinia();

// Set up your Vue app with the router and Pinia
const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(VueCalendarHeatmap);
app.mount('#app');

// Now, after the Vue app is set up, use the store
import { useMoodStore } from './store/moodStore';
const moodStore = useMoodStore();
moodStore.initializeMoods();
