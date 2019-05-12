<template>
  <v-dialog
      v-model="createDialog"
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
              <v-flex 6 class="pa-2 editing">
                <input ref="titleInput" type="text" class="display-2" v-model="currentTask.title" placeholder="Title">
              </v-flex>
            </v-layout>
          </v-layout>
        
        </v-card-title>
        
        <v-card-text>
          <v-layout column class="px-5">
            <v-layout row align-center>
              <v-icon large color="black">account_circle</v-icon>
              <span class="ml-2 headline font-weight-light">El Guera</span>
            </v-layout>
            <v-layout row class="mt-4 subheading editable">
              <v-flex 12 class="editing">
                <textarea id="description-input" class="pa-2" v-model="currentTask.description" rows="5" placeholder="Description"></textarea>
              </v-flex>
              
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
        <v-card-actions>
          <v-btn
              right
              color="primary"
              flat
              @click="createTask"
              >Create Task
          </v-btn>
        </v-card-actions>
      </v-card>
   </div>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator"
import { Task } from "@/models/BoardModel"
import $ from "jquery";

@Component
export default class TaskDetail extends Vue {
  @Prop({ required: true }) currentTask!: Task;
  @Prop({ required: true }) createDialog!:boolean;
  private status: string[] = ["To-Do", "Doing", "Done"];
  private editingTitle: boolean = false;
  private editingDescription: boolean = false;

  constructor() {
    super();
  }

  cancelEdit(section: string) {
    switch(section) {
      case "title":
        this.currentTask.title = (this.currentTask.title.length > 0)? 
                            this.currentTask.title :
                            "Title"
        this.editingTitle = false;
        break;
      case "description":
        this.currentTask.description = (this.currentTask.description != null && this.currentTask.description!.length > 0)?
                            this.currentTask.description :
                            "Description"
        this.editingDescription = false;
        break;
    }
  }

  createTask() {
    console.log("Creating task", this.currentTask.title);
  }

  @Watch('createDialog')
  onDialogChanged(val: string, oldVal: string) {
    if(!val) {
      this.closeModal();
    }
  }

  @Watch('editingTitle')
  onEditingTitleChanged(val: boolean, oldVal: boolean) { 
    if (val) {
      this.triggerTitleFocus();
    }
  }

  triggerTitleFocus() {
    $("#title-input").focus();
    console.log(this.$refs.titleInput);
    // this.$refs.titleInput.focus();
  }
  
  @Watch('editingDescription')
  onEditingDescriptionChanged(val: boolean, oldVal: boolean) { 
    if (val)
      this.triggerDescriptionFocus();
  }

  triggerDescriptionFocus() {
    $("#description-input").focus();
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
  .editable:hover {
    background-color: rgba(175, 175, 175, 0.521);
    border-radius: 5px;
  }
  .editing {
    background-color: rgba(175, 175, 175, 0.521);
    border-radius: 5px;
  }
  input {
    width: 256px;
  }
  input:focus {outline:0;}
  textarea {
    background-color: rgba(202, 202, 202, 0.274);
    border-radius: 5px;
    resize: none;
    width: 260px;
  }
  textarea:focus {outline:0;}
</style>
