<template>
  <NavigationBar/>
  <AlertOverlay/>
  <router-view class="pageBody"/>
</template>
<script>
import AlertOverlay from './components/alert/AlertOverlay.vue'
import NavigationBar from './components/navbar/NavigationBar.vue'
  export default {
    name: "App",
    components: {
      NavigationBar,
      AlertOverlay
    },
    data() {
    },
    methods: {
    }
  }
</script>
<style>
@import '@/assets/css/style.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.pageBody {
  margin-top: 4rem;
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
