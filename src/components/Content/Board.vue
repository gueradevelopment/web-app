<template>
  <div class="board">
    <div id="title">
      <v-layout align-start justify-space-between row>
        <router-link :to="`/board/${id}`"
          ><span>{{ title }}</span></router-link
        >
        <v-btn @click="deleteBoard" large flat icon color="#4D4D4D">
          <v-icon medium color="#4D4D4D">delete</v-icon>
        </v-btn>
      </v-layout>
    </div>
    <v-layout row align-center class="rounded-border">
      <v-flex xs3 v-for="task in tasks" :key="task.id">
        <Task :id="task.id" :board-id="id" />
      </v-flex>
      <v-flex xs2 class="text-xs-center">
        <v-btn @click="newTask" outline fab large color="#A7E2D2">
          <v-icon color="#A7E2D2">add</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <CreateTask
      v-on:closed-modal="closeModal"
      :currentTask="{}"
      :createDialog="createDialog"
      :boardId="id"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Task from './Task.vue';
import CreateTask from '@/components/Details/CreateTask.vue';
import Data from '@/data';

@Component({
  components: {
    Task,
    CreateTask,
  },
})
export default class Board extends Vue {
  @Prop() private id!: number;
  @Prop() private title!: string;

  private createDialog: boolean = false;

  constructor() {
    super();
  }

  async created() {
    this.$store.dispatch('task/getTasks');
  }

  get tasks() {
    return this.$store.getters['task/tasks'](this.id);
  }

  horizontalScroll(e: any) {
    const board = this.$refs['boardList'] as HTMLDivElement;
    e = window.event || e;
    const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    board.scrollLeft -= delta * 25; // Multiplied by 40
    e.preventDefault();
  }

  newTask() {
    this.createDialog = true;
  }

  closeModal() {
    this.createDialog = false;
  }

  deleteBoard() {
    this.$store.dispatch('board/deleteBoard', this.id);
  }
}
</script>

<style scoped lang="scss">
$boardWidth: 85vw;

a {
  color: #4d4d4d;
  text-decoration: none;
}

.board {
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  width: $boardWidth;
  padding: 20px 0;
}

#title {
  display: flex;
  flex-flow: row;
  padding: 0 10px;
  font-size: 24px;
  justify-content: flex-start;
}

.rounded-border {
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  padding: 10px;
  background-color: rgba(77, 77, 77, 0.05);
  border-radius: 10px;
  width: $boardWidth;
  height: 200px;
  overflow-x: scroll;
}

li {
  list-style: none;
}

.rounded-card {
  border-radius: 10px;
}

.new-task {
  border-style: dotted;
  border: 10px dotted;
}
</style>
