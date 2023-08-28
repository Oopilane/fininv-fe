/* eslint-disable no-unused-vars */
import store from '@/store/index.js'
import i18n from '@/i18n/index.js'
import { Alert, AlertType } from '@/models/Alert.js'

const API_LOGIN = '/api/login'
const API_CHECK = '/api/check'
const API_GET_STOCKS = '/api/stocks'
const API_GET_STOCK_SYMBOLS = '/api/stocks/symbols'
const API_TRADE_STOCKS = '/api/stocks/trade'
const API_GET_TRANSACTIONS = '/api/transactions/all'
const API_GET_PROFITABLE_USERS = '/api/users/profitable'

const url = (endpoint) => `${process.env.VUE_APP_API_URL}${endpoint}`

const setHeaders = (_method, _body) => {
    return {
        method: _method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': (store.getters['User/getToken'] == null ? null : 'Bearer ' + store.getters['User/getToken'])
        },
        body: _body
    }
}

const check = () => {
    var headers = setHeaders('GET', null)
    return fetch(url(API_CHECK),headers)
        .then((response) => {
            if(response.status != 200) {
                return false;
            }
            return response.json()
        })
}
const getStocks = () => {
    var headers = setHeaders('GET', null)
    return fetch(url(API_GET_STOCKS),headers)
        .then((response) => {
            if(response.status != 200) {
                store.commit("Alerts/addAlert",(new Alert(AlertType.ERROR, i18n.global.t('error.generic-messages.failed-to-fetch'), 2)))
                return null;
            }
            return response.json()
        })
}
const getSymbols = () => {
    var headers = setHeaders('GET', null)
    return fetch(url(API_GET_STOCK_SYMBOLS),headers)
        .then((response) => {
            if(response.status != 200) {
                store.commit("Alerts/addAlert",(new Alert(AlertType.ERROR, i18n.global.t('error.generic-messages.failed-to-fetch'), 2)))
                return null;
            }
            return response.json()
        })
}
const tradeStocks = (trade) => {
    var headers = setHeaders('POST', JSON.stringify(trade))
    return fetch(url(API_TRADE_STOCKS),headers)
        .then((response) => {
            if(response.status != 200) {
                store.commit("Alerts/addAlert",(new Alert(AlertType.ERROR, i18n.global.t('error.generic-messages.failed-to-trade'), 2)))
                return null;
            }
            store.commit("Alerts/addAlert",(new Alert(AlertType.MESSAGE, i18n.global.t('generic-messages.trade-successful'), 2)))
            return response.json()
        })
}

const getTransactions = () => {
    var headers = setHeaders('GET', null)
    return fetch(url(API_GET_TRANSACTIONS),headers)
        .then((response) => {
            if(response.status != 200) {
                store.commit("Alerts/addAlert",(new Alert(AlertType.ERROR, i18n.global.t('error.generic-messages.failed-to-fetch'), 2)))
                return null;
            }
            return response.json()
        })
}
const getProfitable = () => {
    var headers = setHeaders('GET', null)
    return fetch(url(API_GET_PROFITABLE_USERS),headers)
        .then((response) => {
            if(response.status != 200) {
                store.commit("Alerts/addAlert",(new Alert(AlertType.ERROR, i18n.global.t('error.generic-messages.failed-to-fetch'), 2)))
                return null;
            }
            return response.json()
        })
}
const login = (user) => {
    var headers = setHeaders('POST',JSON.stringify(user))
    return fetch(url(API_LOGIN),headers)
        .then((response) => {
            if(response.status != 200) {
                store.commit("Alerts/addAlert",(new Alert(AlertType.ERROR, i18n.global.t('error.generic-messages.failed-to-login'), 2)))
                return null;
            }
            // TODO: Store Token
            return response.json()
        })
        .catch(reject => {
        store.commit("Alerts/addAlert",(new Alert(AlertType.ERROR, i18n.global.t('error.generic-messages.failed-to-fetch'), 2)))
        return false;
    })
}

const api = {
    url,
    login,
    check,
    getStocks,
    getSymbols,
    getProfitable,
    tradeStocks
}

export {
    login,
    check,
    getStocks,
    getSymbols,
    getTransactions,
    getProfitable,
    tradeStocks
}

export default api 