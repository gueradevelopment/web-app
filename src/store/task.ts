import Data from '../data';

export default {
  namespaced: true,
  state: {
    tasks: Data.tasks,
  },
  actions: {
    getTasks: function({ state, commit }: { state: any, commit: any }) {
      if (state.tasks.length == 0) {
        commit('setTasks', Data.tasks);
      }
    },
    createTask: function({ state, commit }: { state: any, commit: any }, task: any) {
      task.id = state.tasks.length;
      task.shortDescription = '';
      task.status = 'To-Do';
      commit('add', task);
    },
    updateTask: function({ state, commit }: { state: any, commit: any }, updatedTask: any) {
      commit('updateTask', updatedTask);
    },
    deleteTask: function({ commit }: {state:any, commit: any}, taskId: any) {
      commit('deleteTask', taskId);
    }
  },
  mutations: {
    setTasks: function(state: any, tasks: any) {
      state.tasks = tasks;
    },
    add: function(state: any, task: any) {
      state.tasks = [...state.tasks, task];
    },
    updateTask: function(state: any, updatedTask: any) {
      state.tasks.findIndex((element: any) => element.id == updatedTask.id);
      state.tasks.splice(updatedTask.id, 1, updatedTask);
    },
    deleteTask: function(state: any, taskId: any) {
      state.tasks = state.tasks.filter((val: any) => val.id != taskId);
    }
  },
  getters: {
    tasks: function(state: any) {
      return (boardId: any) =>
        state.tasks.filter((val: any) => val.boardId == boardId);
    },
    taskDetails: function(state: any) {
      return (taskId: any) => state.tasks.find((val: any) => val.id == taskId);
    },
    search: function(state: any) {
      return (query: string) =>
        state.tasks.filter((val: any) =>
          val.title.toLowerCase().includes(query)
        );
    },
  },
};
