<template>
  <div class="task detail">
    <h1>{{ task.title }}</h1>
    <input type="checkbox" name="task"
      :checked="task.completed">{{ task.title }}<br>
    <h4>{{ task.description }}</h4>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"

interface Task {
  title: string;
  description: string;
  completed: boolean;
}

@Component
export default class TaskDetail extends Vue {
	@Prop() private task!: Task;

}
</script>