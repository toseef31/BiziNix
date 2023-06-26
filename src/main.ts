import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import store from "./store";
import { defineRule } from "vee-validate";
import { plugin, defaultConfig } from '@formkit/vue';
import { createProPlugin, inputs } from '@formkit/pro';
import { createMultiStepPlugin } from '@formkit/addons';
import { genesisIcons } from '@formkit/icons';
import '@formkit/themes/genesis';
import '@formkit/addons/css/multistep';
import 'vue3-toastify/dist/index.css';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import theme from '../theme.js';
import { generateClasses } from "@formkit/themes";

const pro = createProPlugin('fk-d5888c6a7f', inputs)
//extend defaultConfig for formkit
const config = defaultConfig({
  plugins: [ pro, createMultiStepPlugin() ],
  icons: {
    ...genesisIcons
  },
  classes: generateClasses(theme)
});

const app = createApp(App);
app.use(store);
app.use(createPinia());
app.use(router);
app.use(plugin, defaultConfig(config));
app.use(Vue3Toastify, {
  autoclose: 3000,
  position: "bottom-center",
} as ToastContainerOptions);

app.mount("#app");

defineRule("required", (value: any) => {
  if (!value || !value.length) {
    return "Povinné pole.";
  }
  return true;
});

defineRule("minLength", (value: any, [limit]: any) => {
  // The field is empty so it should pass
  if (!value || !value.length) {
    return true;
  }
  if (value.length < limit) {
    return `Toto pole musí mať minimálne ${limit} znakov.`;
  }
  return true;
});

defineRule("confirmed", (value: any, [target]: any, ctx) => {
  if (value === ctx.form[target]) {
    return true;
  }
  return "Heslá sa musia zhodovať.";
});

declare global {
  interface Window {
    tidioChatApi: any;
  }
}
