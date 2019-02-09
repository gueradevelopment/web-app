<template>
    <div class="modal" :class="{ open }">
        <div class="modal-content">
            <SearchIcons @close="close"/>

        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Emit } from 'vue-property-decorator'
import SearchIcons from '@/components/Sidebar/SearchIcons.vue'

@Component({
    components:{
        SearchIcons,
    }
})
export default class SearchModal extends Vue {
    @Prop({ required: true, type: String }) title!:String;
    @Prop({ required: true, type: Boolean, default: false }) open!:Boolean;
    @Emit("close")
        close(){};

    hoverBack:Boolean;

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

.modal {
    background-color: rgba(0,0,0,.75);
    position: absolute;
    display: flex;
    height: 100vh;
    width: 100vw;
    opacity: 0;
    transition: visibility 250ms, opacity 250ms;
    z-index: -1;
}
.modal.open {
    opacity: 1;
    visibility: visible;
    z-index: 2;
}
.modal-content {
    background-color: #fff;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,.25);
    display: inline-block;
    width: 400px;
    transition: transform 450ms ease;
}
</style>