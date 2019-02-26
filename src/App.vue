<template>
  <v-app>
    <Sidebar :sidebarActive.sync="sidebarActive" ref="Sidebar"/>

    <div id="content" @click="deactivate" :class="{ sidebarActive }">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/task/1">Task</router-link>
      </div>
      <div id="viewer">
        <router-view/>
      </div>
    </div>
    
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Sidebar from '@/components/Sidebar/Sidebar.vue';

@Component({
  components: {
    Sidebar,
  },
})
export default class App extends Vue {
  sidebarActive: Boolean;

  constructor() {
    super();
    this.sidebarActive = false;
  }

  deactivate() {
    this.sidebarActive = false;
  }
}
</script>

<style lang="scss">
@font-face {
    font-family: 'Sky Sans';
    src: url('/assets/SkySans.ttf') format('truetype');
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  max-height: calc(100vh - 20px);
}

#content {
  color: #2c3e50;
  // text-align: center;
  width: 100%;
  position: absolute;
  height: 100%;
  left: 100px;  
  max-height: calc(100% - 20px);
}

#content.sidebarActive {
  left: 380px;
  transition: visibility 250ms, opacity 250ms;
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
  height: 100%;
  max-height: calc(100% - 30px);
  width: 100%;
}
</style>
