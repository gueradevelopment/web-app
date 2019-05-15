<template>
  <v-dialog v-model="dialog" width="500">
    <div class="task-detail">
      <v-card class="rounded-card task-detail">
        <v-card-title class="headline">
          <v-layout column>
            <v-layout row>
              <span class="subheading px-5 mt-3 font-italic">Board</span>
            </v-layout>
            <v-layout row class="px-5">
              <v-flex
                6
                class="pa-2"
                :class="{ editable: !editingTitle, editing: editingTitle }"
              >
                <span
                  v-if="!editingTitle"
                  @click="editingTitle = true"
                  class="display-2"
                  >{{ editingTitleText ? editingTitleText : currentTask.title }}
                </span>
                <div v-else>
                  <input
                    ref="titleInput"
                    type="text"
                    @focusout="cancelEdit('title')"
                    @keyup.esc="cancelEdit('title')"
                    class="display-2"
                    v-model="editingTitleText"
                    placeholder="Title"
                  />
                </div>
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
            <v-layout
              v-if="
                currentTask.description != null && currentTask.description != ''
              "
              row
              class="mt-4 subheading editable"
            >
              <v-flex
                12
                :class="{
                  editable: !editingDescription,
                  editing: editingDescription,
                }"
              >
                <div
                  v-if="!editingDescription"
                  @click="editingDescription = true"
                >
                  {{
                    editingDescriptionText
                      ? editingDescriptionText
                      : currentTask.description
                  }}
                </div>
                <div v-else>
                  <textarea
                    @load="triggerDescriptionFocus()"
                    id="description-input"
                    class="pa-2"
                    @focusout="cancelEdit('description')"
                    @keyup.esc="cancelEdit('description')"
                    v-model="editingDescriptionText"
                    rows="5"
                    placeholder="Description"
                  ></textarea>
                </div>
              </v-flex>
            </v-layout>
            <v-layout v-else row class="mt-4 subheading editable">
              <v-container fluid>
                <div v-for="task of newMiniTasks" :key="task.id">
                  <v-layout align-start justify-space-between row>
                    <v-checkbox
                      v-model="task.completionState"
                      :label="task.title"
                      true-value="Done"
                      false-value="Todo"
                    ></v-checkbox>
                    <v-btn
                      @click="deleteMiniTask(task.id)"
                      flat
                      icon
                      large
                      color="#4D4D4D"
                    >
                      <v-icon small color="#4D4D4D">delete</v-icon>
                    </v-btn>
                  </v-layout>
                </div>
                <v-text-field
                  v-model="newMiniTaskTitle"
                  placeholder="New task"
                  outline
                  single-line
                  @change="newMiniTask"
                ></v-text-field>
              </v-container>
            </v-layout>
            <v-layout row class="mt-5">
              <v-select
                :items="completionState"
                :value="newTaskStatus"
                solo
                flat
                background-color="#A7E2D2"
                placeholder="Status"
                @input="statusChange"
              />
            </v-layout>
            <v-layout row class="mt-5">
              <v-btn
                @click="updateTask()"
                block
                depressed
                large
                color="#A7E2D2"
                :disabled="
                  this.editingDescription ||
                    this.editingTitle ||
                    !(
                      this.editingDescriptionText ||
                      this.editingTitleText ||
                      this.currentTask.completionState != this.newTaskStatus ||
                      !compareMiniTasks
                    )
                "
              >
                Update
              </v-btn>
            </v-layout>
            <v-layout row>
              <v-btn
                @click="deleteTask()"
                block
                depressed
                large
                color="#f95e66"
              >
                Delete
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
import _ from 'lodash';

@Component
export default class TaskDetail extends Vue {
  @Prop({ required: true }) currentTask!: Task;
  @Prop({ required: true }) dialog!: boolean;
  private completionState: string[] = ['Todo', 'Doing', 'Done'];
  private editingTitle: boolean = false;
  private editingTitleText: string = '';
  private editingDescription: boolean = false;
  private editingDescriptionText: string = '';
  private newTaskStatus: string = '';
  private newMiniTasks: any[] = [];
  private newMiniTaskTitle: string = '';
  private deletedMiniTasks: any[] = [];

  constructor() {
    super();
    this.newTaskStatus = this.currentTask.completionState;
    this.newMiniTasks = this.miniTasks.map((a: any) => ({ ...a }));
  }

  cancelEdit(section: string) {
    switch (section) {
      case 'title':
        this.currentTask.title =
          this.currentTask.title.length > 0 ? this.currentTask.title : 'Title';
        this.editingTitle = false;
        break;
      case 'description':
        this.currentTask.description =
          this.currentTask.description != null &&
          this.currentTask.description!.length > 0
            ? this.currentTask.description
            : 'Description';
        this.editingDescription = false;
        break;
    }
  }

  statusChange(value: any) {
    this.newTaskStatus = value;
  }

  updateTask() {
    this.editingTitleText = this.editingTitleText || this.currentTask.title;
    this.editingDescriptionText =
      this.editingDescriptionText || this.currentTask.description!;
    this.$store.dispatch('task/updateTask', {
      id: this.currentTask.id,
      title: this.editingTitleText,
      description: this.editingDescriptionText,
      completionState: this.newTaskStatus,
      miniTasks: !this.compareMiniTasks ? this.newMiniTasks : null,
      deletedMiniTasks:
        this.deletedMiniTasks.length > 0 ? this.deletedMiniTasks : null,
    });
    this.editingTitleText = '';
    this.editingDescriptionText = '';
    this.newMiniTasks = this.miniTasks.map((a: any) => ({ ...a }));
    this.deletedMiniTasks = [];
    // this.newTaskStatus = this.currentTask.completionState;
  }

  newMiniTask() {
    this.newMiniTasks = [
      ...this.newMiniTasks,
      {
        title: this.newMiniTaskTitle,
        checklistId: this.currentTask.id,
        completionState: 'Todo',
        new: true,
      },
    ];
    this.newMiniTaskTitle = '';
  }

  deleteMiniTask(miniTaskId: any) {
    this.newMiniTasks = this.newMiniTasks.filter(val => val.id != miniTaskId);
    this.deletedMiniTasks.push(miniTaskId);
  }

  deleteTask() {
    this.$store.dispatch('task/deleteTask', this.currentTask.id);
    this.closeModal();
  }

  get miniTasks() {
    return this.$store.getters['task/miniTasks'](this.currentTask.id);
  }

  get compareMiniTasks() {
    return _.isEqual(this.miniTasks, this.newMiniTasks);
  }

  get maxMiniTaskIndex() {
    return this.$store.getters['task/maxMiniTaskIndex'];
  }

  @Watch('dialog')
  onDialogChanged(val: string, oldVal: string) {
    if (!val) {
      this.editingDescriptionText = '';
      this.editingTitleText = '';
      this.newTaskStatus = this.currentTask.completionState;
      this.newMiniTasks = this.miniTasks.map((a: any) => ({ ...a }));
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
    this.editingTitleText = this.editingTitleText || this.currentTask.title;
  }

  @Watch('editingDescription')
  onEditingDescriptionChanged(val: boolean, oldVal: boolean) {
    if (val) this.triggerDescriptionFocus();
  }

  triggerDescriptionFocus() {
    $('#description-input').focus();
    this.editingDescriptionText =
      this.editingDescriptionText || this.currentTask.description!;
  }

  @Emit('closed-modal')
  closeModal() {}
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
