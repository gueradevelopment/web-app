<template>
  <TaskDetail :task="currentTask" />
</template>

<script lang="ts">
import Vue from 'vue'
import {Route} from 'vue-router'
import Component from 'vue-class-component';
import TaskDetail from './TaskDetail.vue';

interface WithRoute {
	$route: Route
}

interface Task {
  title: string;
  description: string;
  completed: boolean;
}

@Component({
  components: {
    TaskDetail
  }
})
export default class test_TaskDetail extends Vue implements WithRoute {
  id: number;
  tasks: { [id: number] : Task; } = {};
  currentTask: Task;

  constructor() {
    super();
    this.id = 0;
    this.tasks[1] = { title: "Task 1", description: "this is the Task 1", completed: false}
    this.tasks[2] = { title: "Task 2", description: "this is the Task 2", completed: true}
    this.currentTask = { title: "title", description: "default blah blah", completed: false}
  }

  created () {
    this.id = Number(this.$route.params.id)
    this.currentTask = this.tasks[this.id]; // simulate data retrieving
  }

}
</script>
