import Data from '../data';

export default {
    namespaced: true,
    state: {
        tasks: Data.tasks
    },
    actions: {
        getTasks: function ({ state, commit }: { state: any, commit: any }) {
            if (state.tasks.length == 0) {
                commit("setTasks", Data.tasks);
            }
        },
        createTask: function ({ state, commit }: { state: any, commit: any }, task: any) {
            task.id = state.tasks.length;
            task.shortDescription = "";
            commit("add", task);
        }
    },
    mutations: {
        setTasks: function (state: any, tasks: any) {
            state.tasks = tasks;
        },
        add: function (state: any, task: any) {
            state.tasks = [...state.tasks, task];
        }
    },
    getters: {
        tasks: function (state: any) {
            return (boardId: any) => state.tasks.filter((val: any) => val.boardId == boardId);
        },
        taskDetails: function (state: any) {
            return (taskId: any) => state.tasks.find((val: any) => val.id == taskId);
        }
    }
};