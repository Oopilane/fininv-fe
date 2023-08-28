<template>
    <div :class="getClass">
        <div class="AlertMessage"> 
            {{ alert.message }}
        </div>
        <div class="icon-cross" @click="alertExpired"></div>
    </div>
</template>
<script>
import { AlertType } from '@/models/Alert.js'
export default {
    // eslint-disable-next-line
    name: "Alert",
    props: {
        alert: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            remainingTime: 0,
            interval: null
        }
    },
    computed: {
        getClass() {
            switch(this.alert.type) {
                case AlertType.NOTIFICATION:
                    return "Alert Notification"
                case AlertType.WARNING:
                    return "Alert Warning"
                case AlertType.ERROR:
                    return "Alert Error"
                default:
                    return "Alert Message"
            }
        }
    },
    methods: {
        alertExpired() {
            this.$emit("expired")
        },
        countdown() {
            this.remainingTime--
            if(this.remainingTime <= 0) {
                clearInterval(this.interval)
                this.$emit("expired")
            }
        }
    },
    created() {
        this.remainingTime = this.alert.length
        this.interval = setInterval(this.countdown,1000)
    }
}
</script>
<style scoped>
.icon-cross {
    float:right;
    padding: 4px;
    margin-right: 10px;
    border-radius: 0.25rem;

}
.icon-cross:hover {
    background: #36363661;
}
.Alert {
    height: 1rem;
    width: 30rem;
    height: 2rem;
    display: inline-flex;
    align-items: center;
    border: 1px solid #0000005c;
    color: #000000;
    font-weight: bold;
    border-radius: .25rem;
    margin-bottom: 0.25rem;
}
.AlertMessage {
    width: 100%;
}

.Message, .Notification {
    background: #ffffff;
}
.Warning {
    background: #ff9800;
}
.Error {
    background: #fb1100;
}
</style>