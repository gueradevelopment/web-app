<template>
    <div id="content-wrapper">
        <input @input="onInput" v-model="queryText" type="text" placeholder="Search for..">
        <div v-if="result != {}">
            <div v-for="(value, key, index) in result" v-bind:key="index">
                <div v-if="key=='tasks'">
                    <span>Tasks: </span>
                    <ResultElement v-for="(taskItem, lIndex) in value" v-bind:key="lIndex" :item="taskItem" :type="'task'"/>
                </div>
                <div v-else-if="key=='boards'">
                    <span>Boards: </span>
                    <ResultElement v-for="(boardItem, lIndex) in value" v-bind:key="lIndex" :item="boardItem" :type="'board'"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Emit } from 'vue-property-decorator'
import ResultElement from '@/components/Sidebar/ResultElement.vue'

@Component({
    components: {
        ResultElement,
    }
})
export default class SearchContent extends Vue {
    queryText: String;
    // MOCK JSON RESPONSE
    result: Object;

    mockResult = {
        tasks: [
            {
                taskId: 1,
                taskName: "Task Name 1",
                parentBoardId: 1
            },
            {
                taskId: 2,
                taskName: "Task Name 2",
                parentBoardId: 1
            }
        ],
        boards: [
            {
                boardId: 1,
                boardName: "Board Name 1",
            },
            {
                boardId: 2,
                boardName: "Board Name 2",
            }
        ]
    };

    constructor() {
        super();
        this.queryText = "";
        this.result = {};
    }

    mounted() {
        this.$root.$on("clearSearch", () => {
            this.queryText = "";
            this.result = {};
        });
    }

    onInput() {
        console.log("hello")
        // MOCK JSON RESPONSE
        if(this.queryText.length > 0) {
            this.result = this.mockResult;
        }
        else {
            this.result = {};
        }
    }

}
</script>

<style scoped lang="scss">

$l-green-pal: #A7E2D2;
$d-green-pal: #545C59;
$l-purple-pal: #837581;
$d-purple-pal: #7B5E6B;
$pink-pal: #EEB5AB;
$l-green-pal-grey: #98BAB1;
$pink-pal-grey: #CEA098;
$bg-color: #FFFFFF;

#content-wrapper {
    padding-top: 20%;
    left: 20%;
    // padding: 10px;
    position: absolute;
    width: 80%;
    height: 85%;
}

input[type=text] {
    font-size: 20px;
    font-family: "Sky Sans";
    width: 260px;
    padding: 8px 10px;
    margin: 8px 0;
    display: inline-block;
    outline: 0;
    border-width: 0 0 2px;
    border-color: $l-green-pal;
}

span {
    font-family: "Sky Sans";
}
</style>