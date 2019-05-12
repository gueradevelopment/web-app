<template>
  <div class="task detail">
    <h1>{{ title }}</h1>
    <div v-for="(task, index) in tasks" :key="index">
      <TaskDetail :task="task" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import TaskDetail from "./TaskDetail.vue";

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
export default class CheckListDetail extends Vue {
  @Prop() private tasks!: Task[];
  @Prop() private title!: string;
}
</script>
