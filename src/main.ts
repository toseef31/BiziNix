import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import './index.css'
import router from "./router";
import store from "./store";
import { defineRule } from 'vee-validate';
import { plugin, defaultConfig } from '@formkit/vue'
import { generateClasses } from "@formkit/themes";

//extend defaultConfig
const config = defaultConfig({
  //theme: 'genesis',
  config: {
    classes: generateClasses({
      text: {
        outer: 'mb-5',
        label: 'block mb-1 font-bold text-sm',
        inner: 'max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-blue-500',
        input: 'w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400',
        help: 'text-xs text-gray-500',
        messages: 'list-none p-0 mt-1 mb-0',
        message: 'text-red-500 mb-1 text-xs'
      }
    })
  }
})

const app = createApp(App);
app.use(store);
app.use(createPinia());
app.use(router);
app.use(plugin, defaultConfig);

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
  