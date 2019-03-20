<template>
  <div>
    <Sidebar :sidebarActive.sync="sidebarActive" ref="Sidebar"/>

    <div id="content" @click="deactivate" :class="{ sidebarActive }">
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

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Sidebar from '@/components/Sidebar/Sidebar.vue';

@Component({
  components: {
    Sidebar,
  },
})
export default class Dashboard extends Vue {
  sidebarActive: Boolean;

  constructor() {
    super();
    this.sidebarActive = false;
  }

  mounted() {
    fetch("http://localhost:3000/auth/validate", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    }).then(res => {
      if(res.status === 403) {
        window.location.href = "http://localhost:8080/#/login"
      }
    })
  }

  deactivate() {
    this.sidebarActive = false;
  }
}
</script>

<style lang="scss">

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
