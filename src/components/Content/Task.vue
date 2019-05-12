<template>
    <v-card 
      @click="onClick"
      color="#A7E2D2" 
      class="rounded-card white--text mx-2 my-1 pa-1" 
      flat
      >
        <v-card-title primary-title>
            <div class="headline">{{currentTask.title}}</div>
        </v-card-title>
        <v-card-actions class="pl-3">
            <v-icon color="white">account_circle</v-icon>
            <span class="ml-1">El Guera</span>
        </v-card-actions>
        <TaskDetail v-on:closed-modal="closeModal" :currentTask="currentTask" :dialog="dialog"/>
    </v-card>
</template>

<script lang="ts">

    import { Component, Prop, Vue } from "vue-property-decorator"
    import TaskDetail from "@/components/Details/TaskDetail.vue"
    import { Task as TaskInterface } from "@/models/BoardModel"
    import Data from "@/data";

    @Component({
        components: {
            TaskDetail
        }
    })
    export default class Task extends Vue {
        @Prop() private boardId!: number;
        @Prop() private id!: number;
        @Prop() private title!: string;
        @Prop() private shortDescription!: string;
        @Prop() private description!: string;

        private dialog: boolean = false;
        currentTask: TaskInterface = { id: 0, title: "", description: "", shortDescription: ""};

        constructor() {
            super();
        }

        async created() {
            this.$store.dispatch("task/getTasks");

            this.currentTask.id = this.taskDetail.id != undefined ? this.taskDetail.id : 0;
            this.currentTask.title = this.taskDetail.title != undefined ? this.taskDetail.title : "";
            this.currentTask.description = this.taskDetail.description != undefined ? this.taskDetail.description : "";
            this.currentTask.shortDescription = this.taskDetail.shortDescription != undefined ? this.taskDetail.shortDescription : "";
        }

        get taskDetail () {
            return this.$store.getters["task/taskDetails"](this.id);
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

    .rounded-card{
        border-radius:10px;
        width: 200px;
        height: 150px;
        overflow: hidden;
    }

    .title > span {
        font-family: "Sky Clear", sans-serif;
        color: rgb(255, 140, 104);
        font-weight: bold;
    }

    $textHeight: 1.0em;

</style>