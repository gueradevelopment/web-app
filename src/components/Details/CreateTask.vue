<template>
  <v-dialog v-model="createDialog" width="400">
    <div class="task-detail">
      <v-card class="rounded-card task-detail">
        <v-card-title class="headline">
          <v-layout column>
            <v-layout row>
              <span class="subheading px-5 mt-3 font-italic">Board</span>
            </v-layout>
            <v-layout row class="px-5">
              <v-flex 6 class="pa-2 editing">
                <input
                  ref="titleInput"
                  type="text"
                  class="display-2"
                  v-model="title"
                  placeholder="Title"
                />
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
            <v-layout v-if="type == null">
              <v-layout align-center justify-center row class="mt-4">
                <v-btn @click="type = 'check'" x-large flat fab color="#4D4D4D">
                  <v-icon x-large color="#4D4D4D">check_box</v-icon>
                </v-btn>
                <v-btn @click="type = 'task'" x-large flat fab color="#4D4D4D">
                  <v-icon x-large color="#4D4D4D">create</v-icon>
                </v-btn>
              </v-layout>
            </v-layout>
            <v-layout
              v-else-if="type == 'task'"
              row
              class="mt-4 subheading editable"
            >
              <v-flex 12 class="editing">
                <textarea
                  id="description-input"
                  class="pa-2"
                  v-model="description"
                  rows="5"
                  placeholder="Description"
                ></textarea>
              </v-flex>
            </v-layout>
            <!-- <v-layout row class="mt-5">
              <v-select
                :items="status"
                solo
                flat
                background-color="#A7E2D2"
                placeholder="Status"
                />
            </v-layout> -->
            <v-layout row class="mt-5">
              <v-btn
                @click="createTask"
                block
                depressed
                large
                color="#A7E2D2"
                :disabled="title.length == 0 || type == null"
              >
                Create
              </v-btn>
            </v-layout>
          </v-layout>
        </v-card-text>
      </v-card>
    </div>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator';
import { Task } from '@/models/BoardModel';
import $ from 'jquery';

@Component
export default class TaskDetail extends Vue {
  @Prop({ required: true }) currentTask!: Task;
  @Prop({ required: true }) createDialog!: boolean;
  @Prop({ required: true }) boardId!: number;
  private status: string[] = ['To-Do', 'Doing', 'Done'];

  private type: any = null;

  private title: string = '';
  private description: string = '';

  constructor() {
    super();
    this.type = null;
  }

  createTask() {
    console.log('Creating task', this.title);
    const task = {
      title: this.title,
      description: this.description,
      boardId: this.boardId,
    };
    this.type = null;
    this.title = '';
    this.$store.dispatch('task/createTask', task);
    this.closeModal();
  }

  @Watch('createDialog')
  onDialogChanged(val: string, oldVal: string) {
    if (!val) {
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
    $('#title-input').focus();
  }

  @Watch('editingDescription')
  onEditingDescriptionChanged(val: boolean, oldVal: boolean) {
    if (val) this.triggerDescriptionFocus();
  }

  triggerDescriptionFocus() {
    $('#description-input').focus();
  }

  @Emit('closed-modal')
  closeModal() {
    this.type = null;
    this.title = '';
    this.description = '';
  }
}
</script>

<style lang="scss" scoped>
h6  {
  font-weight: normal !important;
  font-style: normal !important;
}
.rounded-card {
  border-radius: 10px;
}
.task-detail {
  background-color: rgba(77, 77, 77, 0.05);
}
.editable:hover  {
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
input:focus {
  outline: 0;
}
textarea {
  background-color: rgba(202, 202, 202, 0.274);
  border-radius: 5px;
  resize: none;
  width: 260px;
}
textarea:focus {
  outline: 0;
}
</style>
