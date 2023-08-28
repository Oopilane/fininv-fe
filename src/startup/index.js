import { check } from "@/services/api.service"
import router from "@/router"
const startupFrontend = async (store) => { 
    await loadUser(store)
}

async function loadUser(store) {
    var userToken = localStorage.getItem("token")
    if(userToken != null) {
        store.commit('User/setToken',userToken)
        await check()
            .then((response) => {
                store.commit('User/setLoggedIn',true)
                store.commit('User/setUser',response)
                if(response) {
                    router.push({name: "home"})
                } else {
                    store.commit('User/logout')
                }
            })
    } else {
        store.commit('User/setLoggedIn',false)
    }
}

export default startupFrontend