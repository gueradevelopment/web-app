<template>
  <div id="modal" :class="{ open }">
    <div id="modal-content">
      <SearchIcons @close="close" />
      <SearchContent @close="close" />
    </div>
    <div id="grey-area" @click="close"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Emit } from 'vue-property-decorator';
import SearchIcons from '@/components/Sidebar/SearchIcons.vue';
import SearchContent from '@/components/Sidebar/SearchContent.vue';

@Component({
  components: {
    SearchIcons,
    SearchContent,
  },
})
export default class SearchModal extends Vue {
  @Prop({ required: true, default: false }) open!: boolean;

  hoverBack: boolean;

  constructor() {
    super();
    this.hoverBack = false;
  }

  close() {
    this.$root.$emit('clearSearch');
    this.$emit('close');
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

#modal {
  background-color: rgba(0, 0, 0, 0.75);
  position: absolute;
  display: flex;
  height: 99vh;
  max-height: calc(100vh - 9px);
  width: 100vw;
  opacity: 0;
  transition: visibility 250ms, opacity 250ms;
  z-index: -1;
}
#modal.open {
  opacity: 1;
  visibility: visible;
  z-index: 2;
}
#modal-content {
  background-color: #fff;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.25);
  display: inline-block;
  width: 400px;
  height: 100%;
  transition: transform 450ms ease;
  position: absolute;
}

#grey-area {
  position: absolute;
  height: 100%;
  left: 400px;
  width: 100%;
}
</style>
