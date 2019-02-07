<template>
    <div class="task" v-bind:title="title">
        <div class="title">
            <span>{{ title }}</span>
        </div>
        <div class="desc">
            <span>{{ description }}</span>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "vue-property-decorator"

    @Component
    export default class Task extends Vue {
        @Prop() private title!: string;
        private get description () {
            return "A really large text that i am writing in a moment of need"
        }
    }

</script>

<style scoped lang="scss">

    .task {
        display: flex;
        flex-flow: column;
        margin: 0 20px;
        padding: 20px;
        border: 1px solid black;
        border-radius: 5px;
        background-image: linear-gradient(to bottom, rgb(173, 255, 220), rgba(173, 255, 220, 0));
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        user-select: none;
        height: 75%;
        width: 10vw;
    }

    .task:hover {
        cursor: pointer;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.40);
    }

</style>