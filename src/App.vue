<template>
  <div id="app">
    <Sidebar/>

    <div id="content">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <div id="viewer">
        <router-view/>
      </div>
    </div>

  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#content {
  color: #2c3e50;
  // text-align: center;
  width: 100%;
  position: absolute;
  left: 440px;
  height: 100%;
}

#nav {
  padding-top: 20px;
  position: absolute;
  width: 100%;
  height: 10%;
  min-height: 50px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#viewer {
  position: absolute;
  top: 50px;
  height: 90%;
  width: 100%;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Sidebar from '@/components/Sidebar/Sidebar.vue';

@Component({
  components: {
    Sidebar,
  },
})
export default class App extends Vue {}
</script>
