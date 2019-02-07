<template>
    <div id="menu-container">
        <p> {{ msgProp }} </p>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Sidebar extends Vue {
    @Prop() private msgProp!: string;

    msg = "MIGUEL"

    // constructor() {
    //     super();
    //     this.msgProp = "MIKAELO";
    // }

    mounted() {
        alert("Hello " + this.msg);
    }
}
</script>

<style scoped lang="scss">
#menu-container {
    position: absolute;
    background-color: red;
    width: 15%;
    min-width: 200px;
    height: 100%;
}
</style>
