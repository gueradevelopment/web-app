<template>
  <div id="menu-container" :class="{ sidebarActive }">
    <div @click="activate">
      <IconsBar
        @search-clicked="searchClicked"
        @show-dropdown="showDropdownChanged"
        :showDropdownMenuOptions.sync="showDropdownMenuOptions"
      />
    </div>

    <div
      @click="showDropdownChanged(false)"
      id="menubar-container"
      :class="{ sidebarActive }"
    >
      <MenuBar />
    </div>

    <SearchModal :open="showSearch" @close="closeSearch"> </SearchModal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Emit } from "vue-property-decorator";
import IconsBar from "@/components/Sidebar/IconsBar.vue";
import MenuBar from "@/components/Sidebar/MenuBar.vue";
import SearchModal from "@/components/Sidebar/SearchModal.vue";

@Component({
  components: {
    IconsBar,
    MenuBar,
    SearchModal
  }
})
export default class Sidebar extends Vue {
  @Prop({ required: true, default: false }) sidebarActive!: boolean;
  @Prop({ required: true, default: false }) showDropdownMenuOptions!: boolean;

  showSearch: boolean;

  constructor() {
    super();
    this.showSearch = false;
  }

  activate() {
    this.$emit("update:sidebarActive", true);
  }

  showDropdownChanged(e: boolean) {
    this.$emit("show-dropdown", e);
  }

  searchClicked() {
    this.showSearch = true;
  }

  closeSearch() {
    this.showSearch = false;
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
$bg-color: $l-green-pal;

#menu-container {
  position: absolute;
  background-color: $bg-color;
  width: auto;
  height: 100vh;
}

#menu-container.sidebarActive {
  position: absolute;
  background-color: $bg-color;
  min-width: 350px;
  height: 100vh;
}

#menubar-container {
  opacity: 0;
  transition: visibility 250ms, opacity 250ms;
  // left: -500px;
}

#menubar-container.sidebarActive {
  z-index: 1;
  opacity: 1;
  transition: visibility 250ms, opacity 250ms;
  // left: 0px;
}
</style>
