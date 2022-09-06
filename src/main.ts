import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import './index.css'
import router from "./router";
import store from "./store";
import { defineRule } from 'vee-validate';

const app = createApp(App);
app.use(store);
app.use(createPinia());
app.use(router);

app.mount("#app");

defineRule('required', (value: any) => {
    if (!value || !value.length) {
      return 'Povinné pole.';
    }
    return true;
  });
  
  defineRule('minLength', (value: any, [limit]: any) => {
    // The field is empty so it should pass
    if (!value || !value.length) {
      return true;
    }
    if (value.length < limit) {
      return `Toto pole musí mať minimálne ${limit} znakov.`;
    }
    return true;
  });
  
  defineRule('confirmed', (value: any, [target]: any, ctx) => {
    if (value === ctx.form[target]) {
      return true;
    }
    return 'Heslá sa musia zhodovať.';
  });
  