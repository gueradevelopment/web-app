<template>
  <div>
    <Sidebar
      :sidebarActive.sync="sidebarActive"
      :showDropdownMenuOptions.sync="showDropdownMenuOptions"
      @show-dropdown="showDropdownChanged"
      ref="Sidebar"
    />

    <div id="content" @click="deactivate" :class="{ sidebarActive }">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <div id="viewer">
        <router-view />
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
  sidebarActive: boolean;
  showDropdownMenuOptions: boolean;

  constructor() {
    super();
    this.sidebarActive = false;
    this.showDropdownMenuOptions = false;
  }

  mounted() {
    solid.auth
      .currentSession()
      .then((session: any) => {
        if (session) {
          var d = new Date();
          d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
          var expires = 'expires=' + d.toUTCString();
          var id = session.webId.replace(/\//g, '');
          id = id.replace(/\./g, '');
          id = id.replace(/#/g, '');
          id = id.replace(/:/g, '');
          this.$store.dispatch('updateUserId', id);
          document.cookie = 'email=' + id + ';' + expires + ';path=/';
          window.location.href = 'http://localhost:8080/#/';
        } else {
          fetch(`${process.env.VUE_APP_AUTH_HOST}/auth/validate`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
          }).then(res => {
            if (!res.status || res.status !== 200) {
              this.$store.dispatch('updateUserId', '');
              window.location.href = 'http://localhost:8080/#/login';
            }
            res.json().then(data => {
              var d = new Date();
              d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
              var expires = 'expires=' + d.toUTCString();
              this.$store.dispatch('updateUserId', data.Email);
              document.cookie =
                'email=' + data.Email + ';' + expires + ';path=/';
              window.location.href = 'http://localhost:8080/#/';
            });
          });
        }
      })
      .catch((err: any) => console.log(err));
  }

  showDropdownChanged(e: boolean) {
    this.showDropdownMenuOptions = e;
  }

  deactivate() {
    this.sidebarActive = false;
    this.showDropdownMenuOptions = false;
  }
}
</script>

<style lang="scss">
#content {
  color: #2c3e50;
  width: 100%;
  position: absolute;
  height: 100%;
  left: 100px;
  max-height: calc(100% - 20px);
  overflow-y: scroll;
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
