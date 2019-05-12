<template>
  <div class="home">
    <GueraBook />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GueraBook from '@/components/Content/GueraBook.vue';
import Board from '@/components/Content/Board.vue'; // @ is an alias to /src

@Component({
  components: {
    GueraBook,
    Board,
  },
})
export default class Home extends Vue {}
</script>
