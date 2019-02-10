<template>
    <div id="content-wrapper">
        <input v-model="queryText" type="text" placeholder="Search for..">
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Emit } from 'vue-property-decorator'

@Component
export default class SearchContent extends Vue {
    queryText: String;

    constructor() {
        super();
        this.queryText = "";
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

#content-wrapper {
    top: 80px;
    left: 20%;
    padding: 10px;
    position: absolute;
    width: 80%;
    height: 100%;
}

input[type=text] {
    font-size: 20px;
    font-family: "Sky Sans";
    width: 260px;
    padding: 8px 10px;
    margin: 8px 0;
    display: inline-block;
    outline: 0;
    border-width: 0 0 2px;
    border-color: $l-green-pal;
}

// input[type=text]:focus {
    // border-color: $l-green-pal-grey;
// }
</style>