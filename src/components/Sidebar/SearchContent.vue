<template>
  <div id="content-wrapper">
    <input
      @input="onInput"
      v-model="queryText"
      type="text"
      placeholder="Search for.."
    />
    <div v-if="result != {}">
      <div v-for="(value, key, index) in result" v-bind:key="index">
        <div v-if="key == 'tasks'">
          <span v-if="value.length !== 0 && key == 'tasks'">Tasks: </span>
          <ResultElement
            v-for="(taskItem, lIndex) in value"
            v-bind:key="lIndex"
            :item="taskItem"
            :type="'task'"
            @close="close"
          />
        </div>
        <div v-else-if="key == 'boards'">
          <span v-if="value.length !== 0 && key == 'boards'">Boards: </span>
          <ResultElement
            v-for="(boardItem, lIndex) in value"
            v-bind:key="lIndex"
            :item="boardItem"
            :type="'board'"
            @close="close"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Emit } from 'vue-property-decorator';
import ResultElement from '@/components/Sidebar/ResultElement.vue';

@Component({
  components: {
    ResultElement,
  },
})
export default class SearchContent extends Vue {
  queryText: String;
  // MOCK JSON RESPONSE
  result: Object;

  constructor() {
    super();
    this.queryText = '';
    this.result = {};
  }

  mounted() {
    this.$root.$on('clearSearch', () => {
      this.queryText = '';
      this.result = {};
    });
  }

  onInput() {
    // MOCK JSON RESPONSE
    if (this.queryText.length > 0) {
      this.result = {
        tasks: this.$store.getters['task/search'](this.queryText.toLowerCase()),
        boards: this.$store.getters['board/search'](
          this.queryText.toLowerCase()
        ),
      };
    } else {
      this.result = {};
    }
  }

  @Emit('close')
  close() {}
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

#content-wrapper {
  padding-top: 20%;
  left: 20%;
  // padding: 10px;
  position: absolute;
  width: 80%;
  height: 85%;
}

input[type='text'] {
  font-size: 20px;
  font-family: 'Sky Sans';
  width: 260px;
  padding: 8px 10px;
  margin: 8px 0;
  display: inline-block;
  outline: 0;
  border-width: 0 0 2px;
  border-color: $l-green-pal;
}

span {
  font-family: 'Sky Sans';
}
</style>
