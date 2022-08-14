import { createApp } from "vue";
import { createPinia } from "pinia";
import store from "./store";

import App from "./App.vue";
import './index.css'
import router from "./router";

const app = createApp(App);
app.use(store);
app.use(createPinia());
app.use(router);

app.mount("#app");
