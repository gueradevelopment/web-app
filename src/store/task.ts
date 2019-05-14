import Data from '../data';
import { getTasksRequest, createTaskRequest } from '../requests/taskRequests';

export default {
  namespaced: true,
  state: {
    tasks: Data.tasks,
    miniTasks: Data.miniTasks,
  },
  actions: {
    getTasks: function({ state, commit }: { state: any; commit: any }) {
      if (state.tasks.length == 0) {
        getTasksRequest().then((tasks: any) => commit('setTasks', tasks));
      }
    },
    createTask: function({ commit }: { commit: any }, newTask: any) {
      createTaskRequest(newTask).then((task: any) => commit('add', task));
    },
    updateTask: function(
      { state, commit, dispatch }: { state: any; commit: any; dispatch: any },
      updatedTask: any
    ) {
      if (updatedTask.description == null && updatedTask.miniTasks != null) {
        dispatch('updateMiniTasks', {
          miniTasks: updatedTask.miniTasks,
          checklistId: updatedTask.id,
        });
      }
      if (
        updatedTask.deletedMiniTasks != null &&
        updatedTask.deletedMiniTasks.length > 0
      ) {
        commit('deleteMiniTasks', updatedTask.deleteMiniTasks);
      }
      delete updatedTask.miniTasks;
      commit('updateTask', updatedTask);
    },
    updateMiniTasks: function(
      { commit }: { commit: any },
      { miniTasks, checklistId }: { miniTasks: any; checklistId: any }
    ) {
      const updateMiniTasks = miniTasks.filter((val: any) => !val.new);
      const newTasks = miniTasks
        .filter((val: any) => val.new)
        .map((val: any) => {
          delete val.new;
          return val;
        });
      commit('updateMiniTasks', { miniTasks: updateMiniTasks, checklistId });
      if (newTasks.length > 0) {
        commit('addMiniTasks', newTasks);
      }
    },
    deleteTask: function({ commit }: { state: any; commit: any }, taskId: any) {
      commit('deleteTask', taskId);
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
      state.tasks.findIndex((element: any) => element.id == updatedTask.id);
      state.tasks.splice(updatedTask.id, 1, updatedTask);
    },
    deleteTask: function(state: any, taskId: any) {
      state.tasks = state.tasks.filter((val: any) => val.id != taskId);
    },
    updateMiniTasks: function(
      state: any,
      { miniTasks, checklistId }: { miniTasks: any; checklistId: any }
    ) {
      state.miniTasks = state.miniTasks.filter(
        (val: any) => val.checklistId != checklistId
      );
      state.miniTasks = [...state.miniTasks, ...miniTasks];
    },
    addMiniTasks: function(state: any, miniTasks: any) {
      state.miniTasks = [...state.miniTasks, ...miniTasks];
    },
    deleteMiniTasks: function(state: any, miniTasks: any) {
      state.miniTasks = state.miniTasks.filter(
        (val: any) => !miniTasks.includes(val.id)
      );
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
    search: function(state: any) {
      return (query: string) =>
        state.tasks.filter((val: any) =>
          val.title.toLowerCase().includes(query)
        );
    },
    miniTasks: function(state: any) {
      return (checklistId: any) =>
        state.miniTasks.filter((val: any) => val.checklistId == checklistId);
    },
    maxMiniTaskIndex: function(state: any) {
      let miniTask: any;
      let index: number = 0;
      for (miniTask of state.miniTasks) {
        if (miniTask.id >= index) {
          index = miniTask.id + 1;
        }
      }
      return index;
    },
  },
};
