<template>
    <div id="item-wrapper">
        <div v-if="type == 'task'">
            <div id="image-container">
                <img src="@/assets/task.svg">
            </div>
            <div id="data-container" class="task">
                <span>{{ item.taskName }}</span>
                <span>Parent Board ID: {{ item.parentBoardId }}</span>
            </div>
        </div>

        <div v-else-if="type == 'board'">
            <div id="image-container">
                <img src="@/assets/board.svg">
            </div>
            <div id="data-container" class="board">
                <span>{{ item.boardName }}</span>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Emit } from 'vue-property-decorator'

@Component
export default class ResultElement extends Vue {
    @Prop({ required: true, type: String })type!:String;
    @Prop({ required: true, type: Object })item!:{};

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
$bg-color: #FFFFFF;

#item-wrapper {
    height: 50px;
    width: 280px;
    margin: 2px;
    border-radius: 15px;
    border: 3px solid $bg-color;
}

#item-wrapper:hover {
    border-radius: 15px;
    border: 3px solid $pink-pal;
    background-color: $pink-pal;
    cursor: pointer;
}

#image-container {
    position: absolute;
    width: 30px;
    margin-left: 10px;
    margin-top: 7px;
}

#data-container {
    position: absolute;
    margin-left: 60px;
}

#data-container.task {
    margin-top: 1px;
}

#data-container.board {
    margin-top: 13px;
}

span {
    display: block;
}

</style>