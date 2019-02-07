<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
        <Board/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
    import Board from "@/components/Board.vue"
    @Component({
        components: {
            HelloWorld,
            Board
        }
    })
    export default class Home extends Vue {}
</script>
