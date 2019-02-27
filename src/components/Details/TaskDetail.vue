<template>
  <v-dialog
      v-model="dialog"
      width="500"
  >
    <div class="task detail">
      <v-card>
        <v-card-title
            class="headline grey lighten-2"
            primary-title
        >
        {{ currentTask.title }}
        </v-card-title>
        
        <v-card-text>{{ currentTask.description }}</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            flat
            @click="closeModal"
        >
            Ok
        </v-btn>
        
        </v-card-actions>
      </v-card>
   </div>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator"
import { Task } from "@/models/BoardModel"

@Component
export default class TaskDetail extends Vue {
  @Prop({ required: true }) currentTask: Task;
  @Prop({ required: true }) dialog:boolean;

  constructor() {
    super();
    this.dialog = false;
    this.currentTask = { id: "", title: "", description: "", shortDescription: ""};
  }

  @Watch('dialog')
  onDialogChanged(val: string, oldVal: string) {
    if(!val) {
      this.closeModal();
    }
  }

  @Emit("closed-modal")
  closeModal(){}

}
</script>