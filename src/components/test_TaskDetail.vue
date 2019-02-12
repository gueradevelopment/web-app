<template>
  <div class="task detail">
    <h1>This is a task page {{id}}</h1>
    <input type="checkbox" name="vehicle1"
      :checked="currentTask.completed">{{currentTask.description}}<br>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Route} from 'vue-router'
import Component from 'vue-class-component';

interface WithRoute {
	$route: Route
}

interface Task {
  description: string;
  completed: boolean;
}

@Component
export default class TaskDetail extends Vue implements WithRoute {
  id: number;
  tasks: { [id: number] : Task; } = {};
  currentTask: Task;

  constructor() {
    super();
    this.id = 0;
    this.tasks[1] = { description: "Task 1", completed: false}
    this.tasks[2] = { description: "Task 2", completed: true}
    this.currentTask = { description: "default blah blah", completed: false}
  }

  created () {
    this.id = Number(this.$route.params.id)
    this.currentTask = this.tasks[this.id]; // simulate data retrieving
  }

}
</script>
