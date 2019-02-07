<template>
    <div class="board">
        <div id="title">
            <span>{{title}}</span>
        </div>
        <ul id="boardList"
            ref="b"
            v-on:DOMMouseScroll="horizontalScroll"
            v-on:mousewheel="horizontalScroll"
        >
            <li v-for="task in tasks">
                <Task v-bind:title="task"/>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">

    import { Component, Prop, Vue } from "vue-property-decorator";
    import Task from "./Task.vue";

    @Component({
        components: {
            Task
        }
    })
    export default class Board extends Vue {

        @Prop() private title: string = "Sensate";

        private tasks: string[] = [
            "Message",
            "For the alliance, I am there",
            "For the alliance, I am there",
            "For the alliance, I am there",
            "For the alliance, I am there",
            "For the alliance, I am there",
            "For the alliance, I am there",
            "For the alliance, I am there"
        ];

        constructor() {
            super();
        }

        horizontalScroll(e: any) {
            const board = this.$refs["b"] as HTMLDivElement;
            e = window.event || e;
            const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
            board.scrollLeft -= (delta * 25); // Multiplied by 40
            e.preventDefault();
        }
    }

</script>

<style scoped lang="scss">

    .board {
        display: flex;
        flex-flow: column;
        justify-content: flex-start;
    }

    #title {
        display: flex;
        flex-flow: row;
        padding: 0 10px;
        font-size: 24px;
        justify-content: flex-start;
    }

    .board ul {
        display: flex;
        flex-flow: row;
        justify-content: flex-start;
        padding: 10px;
        border: 1px solid gray;
        border-radius: 10px;
        width: 90vw;
        height: 200px;
        overflow-x: scroll;
    }

    li {
        list-style: none;
    }

</style>