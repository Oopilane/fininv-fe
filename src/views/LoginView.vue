<template>
    <div class="LoginForm">
        <input 
            type="text" 
            v-model="user.email"
            autocomplete="off" 
            :placeholder="this.$t('generic-terms.username')"
        >
            <br>
        <input 
            type="password" 
            v-model="user.password"
                :placeholder="this.$t('generic-terms.password')"
        >
            <br>
        <input  
            type="submit"
            :value="this.$t('generic-terms.login')"
            @click="_login"
        >
    </div>
</template>
<script>
import { AlertType, Alert } from '@/models/Alert.js'
import { login } from '@/services/api.service'
import { mapMutations } from 'vuex';
export default {
    name: "LoginView",
    data() {
        return {
            user: {
                email: null,
                password: null
            }
        }
    },
    methods: {
        ...mapMutations({
            addAlert: "Alerts/addAlert",
            setToken: 'User/setToken',
            setLoggedIn: 'User/setLoggedIn'
        }),
        _login() {
            if(this.user.email == null) {
                this.addAlert(new Alert(AlertType.ERROR, this.$t('error.generic-messages.no-email'), 2))
                return;
            }
            if(this.user.email == null) {
                this.addAlert(new Alert(AlertType.ERROR, this.$t('error.generic-messages.no-password'), 2))
                return;
            }
            login(this.user)
                .then((token) => {
                        if(token == null)
                            return
                        
                        this.setToken(token['token'])
                        this.setLoggedIn(true)
                        this.$router.push({name: 'home'})
                })
        }
    }
}
</script>
<style scoped>

</style>