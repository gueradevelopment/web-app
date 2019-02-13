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

        private url = "https://5bae7dbc-83e4-4aa0-afd9-be942edabab5.mock.pstmn.io/boards";
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