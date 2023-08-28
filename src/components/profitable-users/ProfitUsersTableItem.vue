<template>
    <tr :style="getColor">
        <td>
            {{ item['username'] }}
        </td>
        <td>
            {{ item['profit'] }}
        </td>
    </tr>
</template>
<script>

export default {
    name: "ProfitUsersTableItem",
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