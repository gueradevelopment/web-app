<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Dashboard from '@/views/Dashboard.vue';

@Component({})
export default class App extends Vue {

  constructor() {
    super();
  }
}
</script>

<style lang="scss">
@font-face {
    font-family: 'Sky Sans';
    src: url('/assets/SkySans.ttf') format('truetype');
}
</style>
