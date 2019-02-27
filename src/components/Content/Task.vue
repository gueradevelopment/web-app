<template>
    <div class="task" @click="onClick">
        <div class="edit" @click="onEdit">
            <img src="@/assets/edit.svg"/>
        </div>
        <div class="title">
            <span>{{ currentTask.title }}</span>
        </div>
        <div class="desc">
            <span>{{ currentTask.description }}</span>
        </div>
        <div class="icons">
            <i class="remainingTasks">
                <img src="@/assets/task.svg"/>
                {{ 3 }}
            </i>
            <i class="assignedUser">
                <img src="@/assets/user.svg"/>
                {{ "El Guera" }}
            </i>
        </div>
        <TaskDetail v-on:closed-modal="closeModal" :currentTask="currentTask" :dialog="dialog"/>
    </div>
    
    
</template>

<script lang="ts">

    import { Component, Prop, Vue } from "vue-property-decorator"
    import TaskDetail from "@/components/Details/TaskDetail.vue"
    import { Task as TaskInterface } from "@/models/BoardModel"

    function isTaskGet(object: any): object is TaskInterface {
        return (
            typeof object.id === "string" &&
            typeof object.title === "string" &&
            typeof object.shortDescription === "string"
        );
    }

    @Component({
        components: {
            TaskDetail
        }
    })
    export default class Task extends Vue {
        @Prop() private id!: string;
        @Prop() private title!: string;
        @Prop() private shortDescription!: string;
        @Prop() private description!: string;
        private url = "https://7fe7f7a6-7f66-4baf-9c32-20c11832080e.mock.pstmn.io/tasks";
        private dialog: boolean = false;
        currentTask: TaskInterface = { id: "", title: "", description: "", shortDescription: ""};

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
            
            if (isTaskGet(payload)) {
                this.currentTask.id = payload.id != undefined ? payload.id : "";
                this.currentTask.title = payload.title != undefined ? payload.title : "";
                this.currentTask.description = payload.description != undefined ? payload.description : "";
                this.currentTask.shortDescription = payload.shortDescription != undefined ? payload.shortDescription : "";
            } else {
                console.error(payload);
                throw new Error("Unexpected payload for Task");
            }
        }

        onClick(e: MouseEvent) {
            this.dialog = true;           
        }

        onEdit(e: MouseEvent) {
            alert("Edit time");
        }

        closeModal() {
            this.dialog = false;
        }
    }

</script>

<style scoped lang="scss">

    @font-face {
        font-family: 'Sky Sans';
        src: url('./../../assets/SkySans.ttf') format('truetype');
    }

    $mint: #A7E2D2;
    $transparent: rgba(0, 0, 0, 0.0);
    $white: rgba(0, 0, 0, 0.2);

    .task {
        display: flex;
        flex-flow: column;
        margin: 0 20px;
        padding: 20px;
        border: 1px solid black;
        border-radius: 5px;
        background-image: linear-gradient(to bottom, $mint, $transparent);
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
        user-select: none;
        height: 75%;
        width: 10vw;
        min-width: 80px;
    }

    .task:hover {
        cursor: pointer;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.40);
    }

    .title > span {
        font-family: "Sky Clear", sans-serif;
        color: rgb(255, 140, 104);
        font-weight: bold;
    }

    $textHeight: 1.0em;

    .desc  {
        width: 100%;
        font-size: $textHeight;
        height: 6 * $textHeight;
        overflow: hidden;
    }

    .icons {
        justify-self: flex-end;
        display: flex;
        flex-flow: row;
        justify-content: space-around;
    }

    .icons img {
        height: 12px;
        width: 12px;
    }

</style>