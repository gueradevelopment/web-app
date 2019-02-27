<template>

  <div class="task detail">
    <v-card>
      <v-card-title
          class="headline grey lighten-2"
          primary-title
      >
      {{ task.title }}}
      </v-card-title>
      
      <v-card-text>{{ task.title }}</v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          color="primary"
          flat
          @click="dialog = false"
      >
          Ok
      </v-btn>
      
      </v-card-actions>
    </v-card>
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
  @Prop() private dialog: boolean = false;

}
</script>