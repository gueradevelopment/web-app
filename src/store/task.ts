import Data from '../data';

export default {
    namespaced: true,
    state: {
        tasks: Data.tasks
    },
    actions: {
        getTasks: function ({ commit }: { commit: any }) {
            commit("setTasks", Data.tasks);
        }
    },
    mutations: {
        setTasks: function (state: any, tasks: any) {
            state.tasks = tasks;
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