const defaultState = {
    alerts:[]
}

const _getters = {
    getAlerts(state) { return state.alerts }
}
const _mutations = {
    addAlert(state,_alert) { state.alerts.push(_alert) },
    deleteAlert(state, _index) { state.alerts.splice(_index,1) }
}

const Alerts = {
    namespaced: true,
    state: defaultState,
    getters: _getters,
    mutations: _mutations
}

export default Alerts;