<template>
    <tr :style="getColor">
        <td>
            {{ content['user']['username'] }}
        </td>
        <td>
            {{ content['stock']['symbol'] }}
        </td>
        <td>
            {{ content['price'] }}
        </td>
        <td>
            {{ content['stock']['value'] }}
        </td>
        <td>
            {{ content['amount'] }}
        </td>
        <td>
            {{ (content['value'].toFixed(2)) }}
        </td>
        <td >
            {{ getType }}
        </td>
        <td>
            {{ getDate }}
        </td>
        <td :class="getPLClass">
            {{  getProfitLoss }}
        </td>
    </tr>
</template>
<script>
import { format } from "timeago.js"
export default {
    name: "TransactionTable",
    props: {
        content: {
            type: Object,
            required: true
        }
    },
    computed: {
        getDate() {
            // The api returns it in a UTC timestamp
            // and uh... the Date reads it as a GMT +3
            // so just... get rid of the timezone
            return format(new Date(this.content['created']['timestamp'] * 1000),'defaultLocale')
        },
        getType() {
            switch(this.content['type']) {
                case 0: 
                    return this.$t('dashboard.bought')
                case 1: 
                    return this.$t('dashboard.sold')
                default:
                    return 'Error'
            }
        },
        getProfitLoss() {
            var price = this.content['price']
            var curPrice = this.content['stock']['value']
            // User bought
            if(this.content['type'] == 0) 
                // Getting profit loss means finding the difference between current price and old price
                return ((curPrice-price) * this.content['amount']).toFixed(2)
            else 
                // if they sold it's finding the price they sold and new price
                return ((price-curPrice) * this.content['amount']).toFixed(2)
        },
        getPLClass() {
            if(this.getProfitLoss > 0) {
                return "positive"
            } else {
                return "negative"
            }
        }
    }
}
</script>
<style scoped>
.negative {
    background-color: red;
}
.positive {
    background-color: #1eed1e;
}
</style>