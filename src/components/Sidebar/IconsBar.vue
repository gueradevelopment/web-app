<template>
    <div id="icon-wrapper">

        <div @mouseover="hoverLogo=true"
            @mouseleave="hoverLogo=false" 
            id="logo-container"
            :class="{ hovering_bg: hoverLogo }"
            class="circle-container centered" >       

            <img id="logo-picture"
                src="@/assets/logo_w.svg">

        </div>

        <div @mouseover="hoverSearch=true"
            @mouseleave="hoverSearch=false" 
            :class="{ hovering_bg: hoverSearch }"
            class="circle-container centered" 
            id="search-container">       

            <img id="search-picture"
                src="@/assets/search.svg">

        </div>

        <div @mouseover="hoverProfile=true"
            @mouseleave="hoverProfile=false"
            :class="{ hovering_border: hoverProfile }"
            class="circle-container centered"
            id="profile-container">        

            <img id="profile-picture" 
                src="@/assets/profile_test.jpg" alt="Avatar">
        </div>

    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component
export default class IconsBar extends Vue {
    hoverProfile: boolean;
    hoverSearch: boolean;
    hoverLogo: boolean;

    constructor() {
        super();
        this.hoverSearch = false;
        this.hoverProfile = false;
        this.hoverLogo = false;
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

#icon-wrapper {
    padding: 10px;
    position: absolute;
    min-width: 50px;
    width: 20%;
    height: 100%;
}

#logo-container {
    top: 20px;
    position: absolute;
    left: 13px;
}

#logo-picture {
    margin-top: 13%;
    height: 65%;
    width: auto;
}

#search-container {
    position: absolute;
    top: 75px;
    left: 13px
}

#search-picture {
    margin-top: 17%;
    height: 60%;
    width: auto;
}

#profile-container {
    bottom: 30px;
    position: absolute;
    left: 13px
}

#profile-picture {
    margin-left: -25%;
    height: 100%;
    width: auto;
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

