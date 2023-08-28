<template>
  <div class="navbar">
    <!--
    <nav>
      <router-link :to="{name: 'home'}">{{$t('navigation-bar.home')}}</router-link> |
      <router-link :to="{name: 'about'}">{{$t('navigation-bar.about')}}</router-link>
    </nav>
    -->
    <div class="navbar-btns">
      <div class="icon-home btn" @click="this.$router.push({name: 'home'})"></div>
      <div class="icon-cog btn" @click="this.$emit('toggleSettings')"></div>
      <div class="icon-exit btn" @click="logout" v-if="isAuthenticated"></div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: "NavigationBar",
    computed: {
        ...mapGetters({
            isAuthenticated: "User/getLoggedIn"
        })
    },
    methods: {
        logout() {
            this.$store.commit("User/logout")
            this.$router.push({name : 'login'})
        }
    }
}
</script>


<style scoped>

.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    height: 3.75%;
    z-index: 500;
    margin-bottom:1rem;
}
.navbar-btns {
    position: absolute;
    top: 6px;
    font-size: x-large;
    right: 6rem;
    display: flex;
    column-gap:2.5rem;
}
.btn:hover {
  cursor:pointer;
}
nav { 
    padding-top: 10px;
    padding-bottom: 15px;
}
</style>