import Data from '../data';

export default {
  namespaced: true,
  state: {
    tasks: Data.tasks,
  },
  actions: {
    getTasks: function({ state, commit }: { state: any; commit: any }) {
      if (state.tasks.length == 0) {
        commit('setTasks', Data.tasks);
      }
    },
    createTask: function(
      { state, commit }: { state: any; commit: any },
      task: any
    ) {
      task.id = state.tasks.length;
      task.shortDescription = '';
      task.status = 'To-Do';
      commit('add', task);
    },
    updateTask: function(
      { state, commit }: { state: any; commit: any },
      updatedTask: any
    ) {
      console.log(updatedTask);
      commit('updateTask', updatedTask);
    },
  },
  mutations: {
    setTasks: function(state: any, tasks: any) {
      state.tasks = tasks;
    },
    add: function(state: any, task: any) {
      state.tasks = [...state.tasks, task];
    },
    updateTask: function(state: any, updatedTask: any) {
      state.tasks = [
        ...state.tasks.filter((task: any) => task.id !== updatedTask.id),
        updatedTask,
      ];
    },
  },
  getters: {
    tasks: function(state: any) {
      return (boardId: any) =>
        state.tasks.filter((val: any) => val.boardId == boardId);
    },
    taskDetails: function(state: any) {
      return (taskId: any) => state.tasks.find((val: any) => val.id == taskId);
    },
  },
};
