import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import store from "./store";
import { defineRule } from "vee-validate";
import type { DefaultConfigOptions } from '@formkit/vue';
import { plugin, defaultConfig } from '@formkit/vue';
import { generateClasses } from '@formkit/themes'
import { createProPlugin, inputs } from '@formkit/pro';
import { createMultiStepPlugin, createLocalStoragePlugin  } from '@formkit/addons';
import { genesisIcons } from '@formkit/icons'
import '@formkit/addons/css/multistep';
import 'vue3-toastify/dist/index.css';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import { sk } from '@formkit/i18n'
import myTailwindTheme from '../tailwind-formkit-theme.js';
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'
import * as Sentry from "@sentry/vue";

const pro = createProPlugin('fk-d5888c6a7f', inputs)
//extend defaultConfig for formkit
const config: DefaultConfigOptions  = {
  plugins: [ pro,
    createMultiStepPlugin(),
    createLocalStoragePlugin({
      prefix: 'formkit',
      key: undefined,
      control: undefined,
      maxAge: 15778463000, // half year
      debounce: 200,
      beforeSave: undefined,
      beforeLoad: undefined
    }),
   ],
  icons: {
    ...genesisIcons
  },
  locales: { sk },
  locale: 'sk',
  config: {
    classes: generateClasses(myTailwindTheme)
  },
};

const app = createApp(App);
const vfm = createVfm()

Sentry.init({
  dsn: "https://c8275a8dfc949d1afe49d6853de32557@o4506733218627584.ingest.sentry.io/4506733333512192",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

app.use(store);
app.use(createPinia());
app.use(router);
app.use(plugin, defaultConfig(config));
app.use(Vue3Toastify, {
  autoclose: 3000,
  position: "bottom-center",
} as ToastContainerOptions);
app.use(vfm)

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
