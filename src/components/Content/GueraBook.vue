<template>
  <div>
    <v-layout
      row
      align-start
      justify-start
      v-for="board in boards"
      :key="board.id"
    >
      <Board :id="board.id" :title="board.title" />
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Board from "@/components/Content/Board.vue";

@Component({
  components: {
    Board
  }
})
export default class GueraBook extends Vue {
  @Prop() private id!: string;

  async created() {
    this.$store.dispatch("board/getBoards");
  }

  get boards() {
    return this.$store.getters["board/boards"];
  }
}
</script>

<style scoped lang="scss"></style>
