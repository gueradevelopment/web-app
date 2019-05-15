<template>
  <div id="icon-wrapper">
    <div
      @mouseover="hoverLogo = true"
      @mouseleave="hoverLogo = false"
      id="logo-container"
      :class="{ hovering_bg: hoverLogo }"
      class="circle-container centered"
    >
      <img id="logo-picture" src="@/assets/logo_w.svg" />
    </div>

    <div
      @mouseover="hoverSearch = true"
      @mouseleave="hoverSearch = false"
      :class="{ hovering_bg: hoverSearch }"
      class="circle-container centered"
      id="search-container"
      @click="search"
    >
      <img id="search-picture" src="@/assets/search.svg" />
    </div>

    <div
      @mouseover="hoverProfile = true"
      @mouseleave="hoverProfile = false"
      @click="showDropdownChanged(true)"
      :class="{ hovering_border: hoverProfile }"
      class="circle-container centered"
      id="profile-container"
    >
      <img id="profile-picture" src="@/assets/profile_test.jpg" alt="Avatar" />
    </div>

    <div id="dropdown-menu">
      <v-card
        v-if="showDropdownMenuOptions"
        color="white"
        class="rounded-card"
        flat
      >
        <div @click="logout" class="option">
          Log out
        </div>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Emit } from 'vue-property-decorator';

@Component
export default class IconsBar extends Vue {
  @Prop({ required: true, default: false }) showDropdownMenuOptions!: boolean;
  hoverProfile: boolean;
  hoverSearch: boolean;
  hoverLogo: boolean;

  constructor() {
    super();
    this.hoverSearch = false;
    this.hoverProfile = false;
    this.hoverLogo = false;
  }

  logout() {
    fetch(`${process.env.VUE_APP_AUTH_HOST}/auth/logout`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    })
      .then(res => {
        localStorage.removeItem('solid-auth-client');
        this.$store.dispatch('updateUserId', '');
        document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        window.location.href = 'http://localhost:8080/#/login';
      })
      .catch(err => {
        localStorage.removeItem('solid-auth-client');
      });
  }

  showDropdownChanged(e: boolean) {
    this.$emit('show-dropdown', e);
  }

  @Emit('search-clicked')
  search() {}
}
</script>

<style scoped lang="scss">
$l-green-pal: #a7e2d2;
$d-green-pal: #545c59;
$l-purple-pal: #837581;
$d-purple-pal: #7b5e6b;
$pink-pal: #eeb5ab;
$l-green-pal-grey: #98bab1;
$pink-pal-grey: #cea098;
$bg-color: $l-green-pal;

#icon-wrapper {
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  position: absolute;
  min-width: 60px;
  height: 100vh;
  background-color: $bg-color;
}

#logo-container {
  top: 20px;
  position: absolute;
  left: 5px;
  cursor: pointer;
}

#logo-picture {
  margin-top: 13%;
  height: 65%;
  width: auto;
}

#search-container {
  position: absolute;
  top: 85px;
  left: 5px;
  cursor: pointer;
}

#search-picture {
  margin-top: 17%;
  height: 60%;
  width: auto;
}

#profile-container {
  bottom: 15px;
  position: absolute;
  left: 5px;
  cursor: pointer;
}

#profile-picture {
  margin-left: -25%;
  height: 100%;
  width: auto;
}

#dropdown-menu {
  position: absolute;
  bottom: 30px;
  left: 55px;
  z-index: 3;
}

.option {
  align-items: center;
  cursor: pointer;
  display: flex;
  flex: 0 0 auto;
  width: 100px;
  height: 50px;
  padding: 20px;
  border-radius: 3px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.31) 0px 0px 1px;
}

.option:hover {
  background-color: rgb(244, 245, 247);
  color: rgb(23, 43, 77);
  fill: rgb(244, 245, 247);
}

.circle-container {
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 50%;
  border: 5px solid $bg-color;
}

.hovering_border {
  border: 5px solid $l-green-pal-grey !important;
}

.hovering_bg {
  background: $l-green-pal-grey !important;
}

.centered {
  margin: auto;
  align-content: center;
  vertical-align: middle;
  text-align: center;
}
</style>
