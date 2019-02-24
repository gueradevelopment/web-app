<template>
    <div id="menu-wrapper">
        <img id="name-picture"
            src="@/assets/name_w.svg">

        <div id="options-wrapper">
            <div class="option-container">
                <img class="image-icon" src="@/assets/board_w.svg">
                <span class="option-descriptor">Your Guera Books</span>
            </div>

            <div class="option-container">
                <img class="image-icon" src="@/assets/groups.svg">
                <span class="option-descriptor">Manage Groups</span>
            </div>

            <div class="option-container">
                <img class="image-icon" src="@/assets/settings.svg">
                <span class="option-descriptor">Settings</span>
            </div>
        </div>
        
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
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    position: absolute;
    width: 260px;
    left: 60px;
    height: 100%;
    background-color: $bg-color;
}

#name-picture {
    position: absolute;
    width: 40%;
    top: 31px;
    left: 20px;
}

#options-wrapper {
    position: absolute;
    top: 78px;
    left: 15px;
    font-family: "Sky Sans";
    font-size: 17px;
}

.option-container {
    margin: 5px 0px;
    border-radius: 15px;
    padding: 5px 5px;
    height: 50px;
    width: 250px;
}

.image-icon {
    position: absolute;
    height: 40px;
}

span.option-descriptor {
    position: absolute;
    left: 70px;
    margin-top: 5px;
    color: white;
}

.option-container:hover {
    background-color: $l-green-pal-grey;
}
</style>
