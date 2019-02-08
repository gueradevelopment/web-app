<template>
    <div id="menu-container">
        <IconsBar/>
        <MenuBar/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import IconsBar from '@/components/Sidebar/IconsBar.vue'
import MenuBar from '@/components/Sidebar/MenuBar.vue'

@Component({
    components: {
        IconsBar,
        MenuBar
    }
})
export default class Sidebar extends Vue {
    constructor() {
        super();
    }
}
</script>

<style scoped lang="scss">
$l-green-pal: #A7E2D2;
$d-green-pal: #545C59;
$l-purple-pal: #837581;
$d-purple-pal: #7B5E6B;
$pink-pal: #EEB5AB;
$l-green-pal-grey: #98BAB1;
$pink-pal-grey: #CEA098;
$bg-color: $l-green-pal;

#menu-container {
    position: absolute;
    background-color: $bg-color;
    min-width: 300px;
    height: 100%;
}
</style>
