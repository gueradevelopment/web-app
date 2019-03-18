<template>
    <div>
        <v-layout row align-start justify-start v-for="board in boards" :key="board.id">
            <Board :id="board.id" :title="board.title"/>
        </v-layout>
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

        // private url = "https://7fe7f7a6-7f66-4baf-9c32-20c11832080e.mock.pstmn.io/boards";
        private boards: object[] = [];

        @Prop() private id!: string;

        async created() {
            // const response = await fetch(this.url, {
            //     method: "GET",
            //     headers: {
            //         "Accept": "application/json"
            //     }
            // });
            // const payload: BoardsGet = await response.json();
            this.boards = [{"id": 0, "title": "House"}, {"id": 1, "title": "School"}, {"id": 2, "title": "Sport"}];
        }

    }
</script>

<style scoped lang="scss">
</style>