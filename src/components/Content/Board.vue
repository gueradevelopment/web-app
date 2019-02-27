<template>
    <div class="board">
        <div id="title">
            <span>{{ title }}</span>
        </div>
        <ul id="boardList"
            ref="boardList"
            v-on:DOMMouseScroll="horizontalScroll"
            v-on:mousewheel="horizontalScroll"
        >
            <li v-for="task in tasks">
                <Task v-bind:id.sync="task"/>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">

    import { Component, Prop, Vue } from "vue-property-decorator";
    import Task from "./Task.vue";


    interface TasksGet {
        id: string;
        title: string;
        tasks: string[];
    }

    function isTasksGet(object: any): object is TasksGet {
        return (
            typeof object["id"] === "string" &&
            typeof object["title"] === "string" &&
            Array.isArray(object["tasks"])
        );
    }

    @Component({
        components: {
            Task
        }
    })
    export default class Board extends Vue {

        @Prop() private id!: string;
        @Prop() private title!: string;

        private url = "https://7fe7f7a6-7f66-4baf-9c32-20c11832080e.mock.pstmn.io/boards";
        private tasks: string[] = [];

        constructor() {
            super();
        }

        async created() {
            const response = await fetch(`${this.url}/${this.id}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            });
            const payload = await response.json();
            if (isTasksGet(payload)) {
                this.title = payload.title;
                this.tasks = payload.tasks;
            } else {
                console.error(payload);
                throw new Error("Unexpected payload for Tasks");
            }
        }

        horizontalScroll(e: any) {
            const board = this.$refs["boardList"] as HTMLDivElement;
            e = window.event || e;
            const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
            board.scrollLeft -= (delta * 25); // Multiplied by 40
            e.preventDefault();
        }
    }

</script>any

<style scoped lang="scss">

    $boardWidth: 85vw;

    .board {
        display: flex;
        flex-flow: column;
        justify-content: flex-start;
        width: $boardWidth;
        padding: 20px 0;
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
        width: $boardWidth;
        height: 200px;
        overflow-x: scroll;
    }

    li {
        list-style: none;
    }

</style>