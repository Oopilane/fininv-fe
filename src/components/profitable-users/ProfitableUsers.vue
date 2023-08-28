<template>
    <div class="Table Portfolio">
        <h4>
            {{ $t('dashboard.profit') }}
        </h4>
        <table>
            <thead>
                <th @click="sortNumerical('username')">
                    {{  $t('dashboard.name') }}
                </th>
                <th @click="sortNumerical('profit')">
                    {{  $t('dashboard.total-profit') }}
                </th>
            </thead>
            <tbody class="bodyScroll">
                <ProfitUsersTableItem  
                    v-for="(i,index) in portfolio"
                    :item="i"
                    :key="index"
                />
            </tbody>
        </table>
    </div>
</template>
<script>
import ProfitUsersTableItem from './ProfitUsersTableItem.vue'
import { getProfitable } from '@/services/api.service'
export default {
    name: "ProfitableUsers",
    components: {
        ProfitUsersTableItem
    },
    data() {
        return {
            portfolio: null,
            sortedAlphabetical: true,
            sortedNumerical: true
        }
    },
    computed: {
    },
    methods: {
        sortNumerical(section) {
            if(this.sortedNumerical)
                this.portfolio.sort((a,b) => a[section] - b[section])
            else 
                this.portfolio.sort((a,b) => b[section] - a[section])
            this.sortedNumerical = !this.sortedNumerical
        }
    },
    created() {
        getProfitable()
            .then((response) => {
                this.portfolio = response
            })
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