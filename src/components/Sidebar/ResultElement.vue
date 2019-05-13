<template>
  <div id="item-wrapper" @click="action()">
    <div v-if="type == 'task'">
      <div id="image-container">
        <img src="@/assets/task.svg" />
      </div>
      <div id="data-container" class="task">
        <span>{{ item.title }}</span>
      </div>
    </div>

    <div v-else-if="type == 'board'">
      <div id="image-container">
        <img src="@/assets/board.svg" />
      </div>
      <div id="data-container" class="board">
        <span>{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Emit } from 'vue-property-decorator';

@Component
export default class ResultElement extends Vue {
  @Prop({ required: true, type: String }) type!: String;
  @Prop({ required: true, type: Object }) item!: any;

  constructor() {
    super();
  }

  @Emit('close')
  action() {
    if (this.type == 'board') {
      this.goToBoard(this.item.id);
    }
    if (this.type == 'task') {
      this.goToBoard(this.item.boardId);
    }
  }

  goToBoard(id: any) {
    this.$router.push(`/board/${id}`);
  }
}
</script>

<style scoped lang="scss">
$l-green-pal: #a7e2d2;
$d-green-pal: #545c59;
$l-purple-pal: #837581;
$d-purple-pal: #7b5e6b;
$pink-pal: #eeb5ab;
$l-green-pal-grey: #98bab1;
$pink-pal-grey: #cea098;
$bg-color: #ffffff;

#item-wrapper {
  height: 50px;
  width: 280px;
  margin: 2px;
  border-radius: 15px;
  border: 3px solid $bg-color;
}

#item-wrapper:hover {
  border-radius: 15px;
  border: 3px solid $pink-pal;
  background-color: $pink-pal;
  cursor: pointer;
}

#image-container {
  position: absolute;
  width: 30px;
  margin-left: 10px;
  margin-top: 7px;
}

#data-container {
  position: absolute;
  margin-left: 60px;
}

#data-container.task {
  margin-top: 1px;
}

#data-container.board {
  margin-top: 13px;
}

span {
  display: block;
}
</style>
