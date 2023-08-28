<template>
    <div class="Table Generic" v-if="!type">
        <thead>
            <th v-for="(header,index) in headers" :key="index">
                {{ header }}
            </th>
        </thead>
        <tr v-for="(object,index) in content" :key="index">
            <td v-for="(field,index) in object" :key="index">
                {{  field }}
            </td>
        </tr>
    </div>
    <div class="Table Stock" v-if="type == 1">
        <table>
            <thead>
                <th @click="sortAlphabetical('name')">
                    {{ $t('dashboard.name')}}
                </th>
                <th @click="sortAlphabetical('symbol')">
                    {{ $t('dashboard.symbol')}}
                </th>
                <th @click="sortNumerical('value')">
                    {{ $t('dashboard.value')}}
                </th>
                <th @click="sortDate('date')">
                    {{ $t('dashboard.created')}}
                </th>
            </thead>
            <tbody>
                <StockTable   
                    v-for="(c,index) in localContent"
                    :key="index"
                    :content="c"
                />
            </tbody>
        </table>
    </div>
    <div class="Table Transaction" v-if="type == 2">
        <table>
            <thead>
                <th>
                    {{ $t('dashboard.buyer-seller')}}
                </th>
                <th>
                    {{ $t('dashboard.symbol')}}
                </th>
                <th @click="sortNumerical('price')">
                    {{ $t('dashboard.price')}}
                </th>
                <th @click="sortNumerical('price')">
                    {{ $t('dashboard.sell-price')}}
                </th>
                <th @click="sortNumerical('value')">
                    {{ $t('dashboard.amount')}}
                </th>
                <th @click="sortNumerical('value')">
                    {{ $t('dashboard.value')}}
                </th>
                <th>
                    {{ $t('dashboard.type')}}
                </th>
                <th @click="sortDate('timestamp')">
                    {{ $t('dashboard.created')}}
                </th>
                <th >
                    {{ $t('dashboard.profit-loss')}}
                </th>
            </thead>
            
            <tbody>
                <TransactionTable   
                    v-for="(c,index) in content"
                    :key="index"
                    :content="c"
                />
            </tbody>
        </table>
    </div>
</template>
<script>
// Originally this was going to be dynamic but doesn't really work how I expected
// gotta get it done so just hardcode it
// guess we could've split this into different components
import TransactionTable from './TransactionTable.vue'
import StockTable from './StockTable.vue'
export default {
    name: "DisplayTable",
    components: {
        TransactionTable,
        StockTable
    },
    props: {
        headers: {
            type: Array,
            required: true
        },
        content: {
            type: Array,
            required: false
        },
        type: {
            type: String,
            required: false
        }
    },
    data() {
        return {
            localContent: this.content,
            sortedDate: true,
            sortedAlphabetical: true,
            sortedNumerical: true
        }
    },
    methods: {
        sortDate(timestampSection) {
            if(this.sortedDate)
                this.localContent.sort((a,b) => new Date(b['created'][timestampSection]) - new Date(a['created'][timestampSection]))
            else 
                this.localContent.sort((a,b) => new Date(a['created'][timestampSection]) - new Date(b['created'][timestampSection]))
            this.sortedDate = !this.sortedDate
        },
        sortAlphabetical(section) {
            if(this.sortedAlphabetical)
                this.localContent.sort((a,b) => a[section].localeCompare(b[section]))
            else 
                this.localContent.sort((a,b) => b[section].localeCompare(a[section]))
            this.sortedAlphabetical = !this.sortedAlphabetical
        },
        sortNumerical(section) {
            if(this.sortedNumerical)
                this.localContent.sort((a,b) => a[section] - b[section])
            else 
                this.localContent.sort((a,b) => b[section] - a[section])
            this.sortedNumerical = !this.sortedNumerical
        }
    }
}
</script>
<style>
.Table {
    font-family: system-ui;
    border: 1px solid grey;
    border-radius: .25rem;
    overflow-y: scroll;
}
.Table th {
    padding: 0.25rem 1.5rem;
    user-select: none;
}
.Table th:hover {
    cursor: pointer;
}
.Table table{
    border-collapse: collapse;
    width: 100%;
}
.Table thead{
    border-bottom: 1px solid grey;
}
.Transaction {
    height: 20rem;
}
.Stock {
    height: 10rem;
}
.Table tr {
    border-bottom: #80808059 1px solid;
}
.Table  tr:nth-child(even) {
    background-color: #80808059;
}
</style>