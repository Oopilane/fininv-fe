import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import i18n from "@/i18n/index"
import store from "./store";
import startupFrontend from "./startup";

const app = createApp(App)
    .use(store)
    .use(router)
    .use(i18n)
startupFrontend(store).then(() => {
    app.mount("#app");
    document.title = 'FinInv'
})
