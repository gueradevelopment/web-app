<template>
    <div id="menu-wrapper">
        <img id="name-picture"
            src="@/assets/name_w.svg">
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component
export default class MenuBar extends Vue {
    constructor() {
        super();
    }
}
</script>

<style scoped lang="scss">
@font-face {
    font-family: 'Sky Sans';
    src: url('./../../assets/SkySans.ttf') format('truetype');
}

$l-green-pal: #A7E2D2;
$d-green-pal: #545C59;
$l-purple-pal: #837581;
$d-purple-pal: #7B5E6B;
$pink-pal: #EEB5AB;
$l-green-pal-grey: #98BAB1;
$pink-pal-grey: #CEA098;
$bg-color: $l-green-pal;

#menu-wrapper {
    padding: 10px;
    position: absolute;
    width: 80%;
    left: 20%;
    height: 100%;
}

#name-picture {
    position: absolute;
    width: 50%;
    top: 32px;
    left: 15px;
}
</style>
