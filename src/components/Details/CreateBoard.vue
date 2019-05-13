<template>
  <v-dialog v-model="createBoardDialog" width="370">
    <div class="task-detail">
      <v-card class="rounded-card task-detail">
        <v-card-title class="headline">
          <v-layout column>
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
            <v-layout row class="mt-5">
              <v-btn @click="createBoard" block depressed large color="#A7E2D2">
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
import $ from 'jquery';

@Component
export default class CreateBoard extends Vue {
  @Prop({ required: true }) createBoardDialog!: boolean;
  private title: string = "";

  constructor() {
    super();
  }

  createBoard() {
    console.log('Creating board', this.title);
    const board = {
      title: this.title
    };
    this.$store.dispatch('board/createBoard', board);
    this.closeModal();
  }

  @Watch('createBoardDialog')
  onDialogChanged(val: string, oldVal: string) {
    if (!val) {
      this.closeModal();
    }
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
