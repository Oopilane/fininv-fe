import { Alert, AlertType } from '@/models/Alert.js'
import i18n from '@/i18n/index.js'
const defaultState = {
    loggedIn: false,
    token: null,
    user: null,
    permissions: []

}

export const _getters = {
    getLoggedIn(state)           { return state.loggedIn },
    getUser(state)               { return state.user },
    getUserId(state)             { if(state.user == null) return; return state.user.id},
    getUsername(state)           { if(state.user == null) return;  return state.user.username },
    getToken(state)              { return state.token },
    getUserPermissions(state)    { return state.permissions }
}

export const _mutations = {
    setUser(state, _u)     { state.user = _u },
    setLoggedIn(state, _l) { 
        state.loggedIn = _l 
    },
    setToken(state, _t) { 
        state.token = _t
        localStorage.setItem("token",_t)
    },
    logout(state) {
        localStorage.removeItem("token")
        state.user = {}
        state.token = null
        state.loggedIn = false
        this.commit("Alerts/addAlert",(new Alert(AlertType.MESSAGE, i18n.global.t('generic-messages.logged-out'), 2)))
    }
}

const user = {
    namespaced: true,
    state: defaultState,
    getters: _getters,
    mutations: _mutations
}

export default user