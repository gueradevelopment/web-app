<template>
    <div class="gueraBook">
        <ul>
            <li v-for="board in boards">
                <Board v-bind:id="board"/>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">

    import { Component, Prop, Vue } from "vue-property-decorator";
    import Board from "@/components/Content/Board.vue";

    interface BoardsGet {
        boards: string[];
    }

    @Component({
        components: {
            Board
        }
    })
    export default class GueraBook extends Vue {

        private url = "https://7fe7f7a6-7f66-4baf-9c32-20c11832080e.mock.pstmn.io/boards";
        private boards: string[] = [];

        @Prop() private id!: string;

        async created() {
            const response = await fetch(this.url, {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            });
            const payload: BoardsGet = await response.json();
            this.boards = payload.boards;
        }

    }
</script>

<style scoped lang="scss">

    li {
        list-style: none;
    }

</style>