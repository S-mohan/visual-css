import { createApp } from "vue";
import { createPinia } from "pinia";
import TDesign from "tdesign-vue-next";
import "tdesign-vue-next/es/style/index.css";

import App from "./App.vue";
import router from "./router";
import "./assets/app.less";

const app = createApp(App);

app.use(TDesign);
app.use(createPinia());
app.use(router);

app.mount("#app");
