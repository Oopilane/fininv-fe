<template>
    <div class="Table Portfolio">
        <h4>
            {{ $t('dashboard.portfolio') }}
        </h4>
        <table>
            <thead>
                <th @click="sortNumerical('symbol')">
                    {{  $t('dashboard.symbol') }}
                </th>
                <th @click="sortNumerical('amount')">
                    {{  $t('dashboard.amount') }}
                </th>
            </thead>
            <tbody class="bodyScroll">
                <PortfolioTableItem  
                    v-for="(i,index) in portfolio"
                    :item="i"
                    :color="index"
                    :key="index"
                />
            </tbody>
        </table>
    </div>
</template>
<script>

import { mapGetters } from 'vuex';
import PortfolioTableItem from './PortfolioTableItem.vue'

export default {
    name: "PortfolioTable",
    components: {
        PortfolioTableItem
    },
    data() {
        return {
            portfolio: null,
            sortedAlphabetical: true,
            sortedNumerical: true
        }
    },
    computed: {
        ...mapGetters({
            getUser: 'User/getUser'
        }),
        getPortfolio() {
            let u = this.getUser
            if(!u)
                return null
            console.log(u['portfolio']['stockPortfolios'])
            return u['portfolio']['stockPortfolios']
        }
    },
    methods: {
        sortAlphabetical(section) {
            if(this.sortedAlphabetical)
                this.portfolio.sort((a,b) => a['stock'][section].localeCompare(b['stock'][section]))
            else 
                this.portfolio.sort((a,b) => b['stock'][section].localeCompare(a['stock'][section]))
            this.sortedAlphabetical = !this.sortedAlphabetical
        },
        sortNumerical(section) {
            if(this.sortedNumerical)
                this.portfolio.sort((a,b) => a[section] - b[section])
            else 
                this.portfolio.sort((a,b) => b[section] - a[section])
            this.sortedNumerical = !this.sortedNumerical
        }
    },
    created() {
        if(this.getUser['portfolio'] != null)   
            this.portfolio = this.getUser['portfolio']['stockPortfolios']
    }
}
</script>
<style scoped>
.Portfolio {
    overflow-y: scroll;
}
.Portfolio::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.Portfolio {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
h4 {
    padding: 0.5rem 0.75rem;
    background-color: rgb(128 128 128 / 63%);
    border-radius: 0.25rem;
    margin: 0.25rem;
}
</style>