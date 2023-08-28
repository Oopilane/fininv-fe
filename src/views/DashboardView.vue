<template>
    <div class="Dashboard">
        <div class="Header">
            <DisplayTable
                v-if="stocksTableLoaded"
                :headers="getStockHeaders"
                :content="stocks"
                type=1
            />
            <br>
            <DisplayTable
                v-if="transactionsTableLoaded"
                :headers="getTransactionHeaders"
                :content="transactions"
                type=2
            />
        </div>
        <div class="Footer">
            <PurchaseForm/>
            <PortfolioTable/>
            <ProfitableUsers/>
        </div>

        <!-- Stock Display Table-->
        <!-- Recent Transactions Table-->
        <!-- P/L? -->
    </div>
</template>
<script>
import { check, getStocks, getTransactions } from '@/services/api.service'
import DisplayTable from '@/components/tables/DisplayTable.vue'
import PortfolioTable from '@/components/portfolio/PortfolioTable.vue'
import PurchaseForm from '@/components/purchase-form/PurchaseForm.vue'
import ProfitableUsers from '@/components/profitable-users/ProfitableUsers.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: "DashboardView",
    components: {
        DisplayTable,
        PortfolioTable,
        PurchaseForm,
        ProfitableUsers
    },
    data() {
        return {
            stocks: null,
            stocksTableLoaded: false,
            transactions: null,
            transactionsTableLoaded: false,
            stockInterval: null,
            transactionInterval: null
        }
    },
    computed: {
        ...mapGetters({
            getUser: 'User/getUser'
        }),
        // Make this automatic or something later on :konata_yawn:
        getStockHeaders() {
            return ["name","symbol","value","created"]
        },
        getTransactionHeaders() {
            return ["user","stock","price","amount","type"]
        }
    },
    methods: {
        ...mapMutations({
            setUser: 'User/setUser'
        }),
        fetchStocks() {
            getStocks().then((_stocks) => {
                this.stocks = _stocks
                this.stocksTableLoaded = true
            })
        },
        fetchTransactions() {
            getTransactions().then((_tr) => {
                this.transactions = _tr
                this.transactionsTableLoaded = true
            })
        }
    },
    created() {
        this.fetchStocks();
        this.fetchTransactions();
        this.stockInterval = setInterval(this.fetchStocks, 5000);
        this.transactionInterval = setInterval(this.fetchTransactions, 5000);

        if(this.getUser == null) {
            check()
                .then((response) => {
                    this.setUser(response)
                })
        }

    },
    beforeUnmount() {
        clearInterval(this.stockInterval);
        clearInterval(this.transactionInterval);
    }
}
</script>
<style scoped>
.Dashboard {
    margin-left: auto;
    margin-right: auto;
    display: inline-grid;
}


.Footer {
    margin-top: 3rem;
    column-gap: 2.5rem;
    display: inline-flex;
    justify-content: center;
    height: 80%;

}

</style>