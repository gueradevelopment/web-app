<template>
  <div class="home">
    <Sidebar msgProp="MIKAELO"/>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Sidebar from '@/components/Sidebar.vue';

@Component({
  components: {
    HelloWorld,
    Sidebar,
  },
})
export default class Home extends Vue {}
</script>
