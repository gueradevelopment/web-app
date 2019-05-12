<template>
    <v-container fill-height class="board pa-0 ma-0">
        <v-layout column>
            <v-layout align-start justify-space-between row>
                <h1>{{ board.title }}</h1>
                <v-btn @click="newTask" large flat icon color="#4D4D4D">
                    <v-icon medium color="#4D4D4D">add</v-icon>
                </v-btn>
            </v-layout>
            <v-layout row align-start fill-height class="border-top">
                <v-flex 4 fill-height>
                    <v-layout column justify-start fill-height align-start>
                        <h2 class="mx-0 pa-2">To-Do</h2>
                        <div class="column-container mx-0 px-2 py-4">
                            <v-layout row align-start justify-center v-for="task in tasks" :key="task.id">
                                <Task :id="task.id" :board-id="boardId"/>
                            </v-layout>
                        </div>
                    </v-layout>
                </v-flex>
                <v-flex 4 fill-height>
                    <v-layout column justify-start fill-height align-start>
                        <h2 class="mx-0 pa-2">Doing</h2>
                        <div class="column-container mx-0 px-2 py-4">
                            <v-layout row align-start justify-center v-for="task in tasks" :key="task.id">
                                <Task :id="task.id" :board-id="boardId"/>
                            </v-layout>
                        </div>
                    </v-layout>
                </v-flex>
                <v-flex 4 fill-height>
                    <v-layout column justify-start fill-height align-start>
                        <h2 class="mx-0 pa-2">Done</h2>
                        <div class="column-container mx-0 px-2 py-4">
                            <v-layout row align-start justify-center v-for="task in tasks" :key="task.id">
                                <Task :id="task.id" :board-id="boardId"/>
                            </v-layout>
                        </div>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-layout>
        <CreateTask v-on:closed-modal="closeModal" :currentTask="{}" :createDialog="createDialog"/>
    </v-container>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "vue-property-decorator";
    import Task from "@/components/Content/Task.vue";
    import CreateTask from "@/components/Details/CreateTask.vue";
    import Data from "@/data";

    @Component({
        components: {
            Task,
            CreateTask
        }
    })

    export default class BoardDetail extends Vue {
        @Prop() private id!: string;
        private boardId!: number;
        private title: string = "Board Title"

        private createDialog: boolean = false;

        created() {
            this.boardId = parseInt(this.id);
            this.$store.dispatch("board/getBoards");
            this.$store.dispatch("task/getTasks");
        }

        get board () {
            return this.$store.getters["board/boardDetails"](this.boardId);
        }

        get tasks() {
            return this.$store.getters["task/tasks"](this.id);
        }

        newTask() {
            console.log(`New task from board ${this.id}`);
            this.createDialog = true;
        }

        closeModal() {
            this.createDialog = false;
        }
    }
</script>

<style lang="scss" scoped>

    h1 {
        color: #4D4D4D;
    }
    
    h2 {
        color: rgba(77, 77, 77, 0.60);
        font-style: italic;
    }

    .border-top {
        display: flex;
        flex-flow: row;
        justify-content: flex-start;
        padding: 10px;
        border-top: 2px solid gray;
        width: 100%;
        height: 100%;
        overflow-x: scroll;
        overflow-y: hidden;
    }

    .column-container {
        background-color: rgba(77, 77, 77, 0.05);
        // border: 1px solid gray;
        border-radius: 10px;
        height: 100%;
        overflow-y: scroll;
        width: 95%;
    }

    .border-right {
        display: flex;
        border-right: 2px solid gray !important;
        border-right-style: dotted !important;
    }
</style>
