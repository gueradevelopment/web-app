<template>
    <div class="board">
        <div id="title">
            <router-link :to="`/board/${id}`"><span>{{ title }}</span></router-link>
        </div>
        <v-layout row align-center class="rounded-border">
            <v-flex xs3 v-for="task in tasks" :key="task.id">
                <Task :id="task.id"/>
            </v-flex>
            <v-flex xs2 class="text-xs-center">
                <v-btn @click="newTask" outline fab large color="#A7E2D2" >
                    <v-icon color="#A7E2D2">add</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>

<script lang="ts">

    import { Component, Prop, Vue } from "vue-property-decorator";
    import Task from "./Task.vue";


    interface TasksGet {
        id: string;
        title: string;
        tasks: object[];
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

        // private url = "https://7fe7f7a6-7f66-4baf-9c32-20c11832080e.mock.pstmn.io/boards";
        private tasks: object[] = [];

        constructor() {
            super();
        }

        async created() {
            // const response = await fetch(`${this.url}/${this.id}`, {
            //     method: "GET",
            //     headers: {
            //         "Accept": "application/json"
            //     }
            // });
            // const payload = await response.json();
            const payload = {
                "id": "0",
                "title": "MyBoard",
                "tasks": [{"id": 0, "title":"Clean my room"}, {"id": 1, "title":"Clean another room"}]
            }
            if (isTasksGet(payload)) {
                // this.title = payload.title;
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

        newTask() {
            console.log(`New task from board ${this.id}`);
        }
    }

</script>

<style scoped lang="scss">
    
    $boardWidth: 85vw;
    
    a {
        color: #4D4D4D;
        text-decoration: none;
    }

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

    .rounded-border {
        display: flex;
        flex-flow: row;
        justify-content: flex-start;
        padding: 10px;
        background-color: rgba(77, 77, 77, 0.05);
        border-radius: 10px;
        width: $boardWidth;
        height: 200px;
        overflow-x: scroll;
    }

    li {
        list-style: none;
    }

    .rounded-card{
        border-radius:10px;
    }

    .new-task{
        border-style: dotted;
        border: 10px dotted;
    }

</style>