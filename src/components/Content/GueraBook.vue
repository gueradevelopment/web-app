<template>
  <div>
    <v-layout row>
      <v-btn color="#A7E2D2" depressed @click="createBoard">
        Create Board
      </v-btn>
    </v-layout>
    <v-layout
      row
      align-start
      justify-start
      v-for="board in boards"
      :key="board.id"
    >
      <Board :id="board.id" :title="board.title" />
    </v-layout>
    <CreateBoard
      v-on:closed-modal="closeModal"
      :createBoardDialog="createBoardDialog"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Board from '@/components/Content/Board.vue';
import CreateBoard from '@/components/Details/CreateBoard.vue';

@Component({
  components: {
    Board,
    CreateBoard,
  },
})
export default class GueraBook extends Vue {
  @Prop() private id!: string;

  private createBoardDialog: boolean = false;

  async created() {
    this.$store.dispatch('board/getBoards');
  }

  get boards() {
    return this.$store.getters['board/boards'];
  }

  createBoard() {
    this.createBoardDialog = true;
  }

  closeModal() {
    this.createBoardDialog = false;
  }
}
</script>

<style scoped lang="scss"></style>
