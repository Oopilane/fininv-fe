<template>
    <div class="PurchaseForm">
            <div class="balance">
                <h4>
                    {{  $t('dashboard.balance') }}
                </h4>
                <div class="balanceAmount"> {{  getBalance }} </div>
            </div>
            <div class="inputs">
                <select v-model="symbol">
                    <option value=null disabled selected>{{ $t('dashboard.select-symbol') }}</option>
                    <option 
                        v-for="(s,index) in symbols"
                        :value="s['symbol']"
                        :key="index"
                    >
                        {{ s['symbol'] }}
                    </option>
                </select>
                <input
                    type="text"
                    v-model="quantity"
                    :placeholder="$t('dashboard.quantity')"
                />
            </div>
            <div class="buttons">
                <input
                    type="submit"
                    @click="buyOrSell(0)"
                    :value="$t('dashboard.buy')"
                />
                <input
                    type="submit"
                    @click="buyOrSell(1)"
                    :value="$t('dashboard.sell')"
                />
            </div>
    </div>
</template>
<script>
import { AlertType, Alert } from '@/models/Alert.js'
import { getSymbols, tradeStocks } from '@/services/api.service'
import { mapMutations, mapGetters } from 'vuex';
export default {
    name: "PurchaseForm",
    data() {
        return {
            symbols: null,
            symbol: null,
            quantity: null
        }
    },
    computed: {
        ...mapGetters({
            getUser: "User/getUser"
        }),
        getBalance() {
            let u = this.getUser
            if(!u)
                return 0
            return u['balance']
        }
    },
    methods: {
        ...mapMutations({
            addAlert: "Alerts/addAlert",
        }),
        buyOrSell(action) {
            if(this.symbol == null) {
                this.addAlert(new Alert(AlertType.ERROR, this.$t('error.generic-messages.no-symbol'), 2))
                return
            }
            if(this.quantity == null) {
                this.addAlert(new Alert(AlertType.ERROR, this.$t('error.generic-messages.no-quantity'), 2))
                return
            }

            tradeStocks({
                'symbol': this.symbol,
                'quantity': this.quantity,
                'type': action
            })
            this.symbol = null
            this.quantity = null
        }
    },
    created() {
        getSymbols()
            .then((response) => {
                this.symbols = response
            })
    }
}
</script>
<style scoped>
.PurchaseForm {
    display: inline-grid;
    padding: 2rem;
    border: 1px solid grey;
    border-radius: 0.25rem;
}
.inputs {
    display: inline-grid;
    margin-top: 1rem;
}
.buttons {
    column-gap: 1rem;
    display: flex;
    justify-content: center;
    column-gap: 1rem;
}
.balance {
    font-size: larger;
    font-weight: bolder;
    background-color: #8080806b;
    border-radius: 0.25rem;
    margin: 0.25rem;
}
.balanceAmount {
    padding: .75rem;
}
h4 {
    padding: 0.5rem 0.75rem;
    background-color: rgb(128 128 128 / 63%);
    border-radius: 0.25rem;
    border-bottom-right-radius: 0rem;
    border-bottom-left-radius: 0rem;
    margin: 0rem;
}
input, select {
    font-family: system-ui;
    border: 1px solid grey;
    border-radius: 0.25rem;
    margin-bottom: 0.15rem;
}
input[type="submit"] {
    padding: 0.05rem 1.25rem;
}
input[type="submit"]:hover {
    background-color:rgb(128 128 128 / 20%);
    cursor:pointer;
}
</style>