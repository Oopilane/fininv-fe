import { createStore } from "vuex"
import user from '@/modules/user'
import alerts from "@/modules/alerts"
export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    User: user,
    Alerts: alerts
  },
});
