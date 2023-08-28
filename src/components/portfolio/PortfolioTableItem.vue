<template>
    <tr :style="getColor">
        <td>
            {{ item['Stock']['symbol'] }}
        </td>
        <td>
            {{ item['amount'] }}
        </td>
    </tr>
</template>
<script>

export default {
    name: "PortfolioTableItem",
    props: {
        item: {
            type: Object,
            required: true
        },
        color: {
            type: Number,
            required: true
        }
    },
    computed: {
        getColor() {
            if(this.color % 2) {
                return 'background-color: #80808059'
            } else {
                return 'background-color: white'
            }
        },
    }
}
</script>
<style scoped>

</style>