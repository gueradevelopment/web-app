<template>
    <div id="icon-wrapper">

        <div id="logo-container"
            class="circle-container centered">       

            <img id="logo-picture"
                src="@/assets/logo_g.svg">

        </div>

        <div @mouseover="hoverBack=true"
            @mouseleave="hoverBack=false" 
            :class="{ hovering_bg: hoverBack }"
            class="circle-container centered" 
            id="back-container"
            @click="close">       

            <img id="back-picture"
                src="@/assets/left-arrow.svg">

        </div>

    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Emit } from 'vue-property-decorator'

@Component
export default class SearchIcons extends Vue {
    @Emit("close")
        close(){};

    hoverBack:boolean;

    constructor() {
        super();
        this.hoverBack = false;
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
$bg-color: #FFFFFF;

#icon-wrapper {
    padding-top: 10px;
    position: absolute;
    width: 20%;
    height: 99%;
}

#logo-container {
    top: 20px;
    position: absolute;
    left: 5px;
}

#logo-picture {
    margin-top: 13%;
    height: 65%;
    width: auto;
}

#back-container {
    position: absolute;
    top: 85px;
    left: 5px;
    cursor: pointer;
}

#back-picture {
    margin-top: 17%;
    height: 60%;
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