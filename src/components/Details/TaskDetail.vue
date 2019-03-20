<template>
  <v-dialog
      v-model="dialog"
      width="400"
  >
    <div class="task-detail">
      <v-card class="rounded-card task-detail">
        <v-card-title
            class="headline"
        >
          <v-layout column>
            <v-layout row>
              <span class="subheading px-5 mt-3 font-italic">Board</span>
            </v-layout>
            <v-layout row class="px-5">
              <span class="display-2">{{ currentTask.title }}</span>
            </v-layout>
          </v-layout>
        
        </v-card-title>
        
        <v-card-text>
          <v-layout column class="px-5">
            <v-layout row align-center>
              <v-icon large color="black">account_circle</v-icon>
              <span class="ml-2 headline font-weight-light">El Guera</span>
            </v-layout>
            <v-layout row class="mt-4 subheading">
              {{ currentTask.description }}
            </v-layout>
            <v-layout row class="mt-5">
              <v-select
                :items="status"
                solo
                flat
                background-color="#A7E2D2"
                placeholder="Status"
                />
            </v-layout>
          </v-layout>
        </v-card-text>

        <!-- <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            flat
            @click="closeModal"
        >
            Ok
        </v-btn>
        </v-card-actions> -->
      </v-card>
   </div>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator"
import { Task } from "@/models/BoardModel"

@Component
export default class TaskDetail extends Vue {
  @Prop({ required: true }) currentTask!: Task;
  @Prop({ required: true }) dialog!:boolean;
  private status: string[] = ["To-Do", "Doing", "Done"];

  constructor() {
    super();
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

<style lang="scss" scoped>
  h6 {
    font-weight: normal !important;
    font-style: normal !important;
  }
  .rounded-card {
    border-radius:10px;
  }
  .task-detail {
    background-color: rgba(77, 77, 77, 0.05);
  }
</style>
