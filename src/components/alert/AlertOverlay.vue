<template>
    <div class="AlertArea">
        <Alert 
            v-for="(alert,index) in Alerts"
            :alert="alert"
            :key="index"

            @expired="alertExpired(index)"
        />
    </div>
</template>
<script>
import Alert from './Alert.vue'
import { mapGetters, mapMutations } from 'vuex';
export default {
    name: "AlertOverlay",
    components: {
        Alert
    },
    computed: {
        ...mapGetters({ 
            Alerts: "Alerts/getAlerts"
        })
    },
    methods: {
        ...mapMutations({
            deleteAlert: "Alerts/deleteAlert"
        }),
        alertExpired(index) {
            this.deleteAlert(index)
        }
    }
}
</script>
<style scoped>
.AlertArea {
    display: grid;
    position: fixed;
    z-index: 400;
    justify-content: center;
    top: 5%;
    width: 100%;
}
</style>