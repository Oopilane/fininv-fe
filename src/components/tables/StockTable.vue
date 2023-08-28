<template>
    <tr :style="getColor">
        <td>
            {{ content['name'] }}
        </td>
        <td>
            {{ content['symbol'] }}
        </td>
        <td>
            {{ content['value'] }}
        </td>
        <td>
            {{ getDate }}
        </td>
    </tr>
</template>
<script>
import { format } from "timeago.js"
export default {
    name: "StockTable",
    props: {
        content: {
            type: Object,
            required: true
        }
    },
    computed: {
        getDate() {
                return format(new Date(this.content['created']['date'] ),'defaultLocale')
        }
    }
}
</script>
<style scoped>

</style>