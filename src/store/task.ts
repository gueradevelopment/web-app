import {
  getTasksRequest,
  getMinitasksRequest,
  createTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
  updateMinitaskRequest,
  createMinitaskRequest,
  deleteMinitasksRequest,
} from '../requests/taskRequests';

export default {
  namespaced: true,
  state: {
    tasks: [],
    miniTasks: [],
  },
  actions: {
    getTasks: function({ state, commit }: { state: any; commit: any }) {
      if (state.tasks.length == 0) {
        getTasksRequest().then((tasks: any) => commit('setTasks', tasks));
        getMinitasksRequest().then((minitasks: any) =>
          commit('setMiniTasks', minitasks)
        );
      }
    },
    createTask: function({ commit }: { commit: any }, newTask: any) {
      createTaskRequest(newTask).then((task: any) => commit('add', task));
    },
    updateTask: function(
      { commit, dispatch }: { commit: any; dispatch: any },
      updatedTask: any
    ) {
      // Update and create minitasks
      if (
        (!updatedTask.description || updatedTask.description == null) &&
        updatedTask.miniTasks != null
      ) {
        dispatch('updateMiniTasks', {
          miniTasks: updatedTask.miniTasks,
          checklistId: updatedTask.id,
        });
      }
      // Delete minitasks
      if (
        updatedTask.deletedMiniTasks != null &&
        updatedTask.deletedMiniTasks.length > 0
      ) {
        updatedTask.deletedMiniTasks.forEach((deleteMinitask: any) => {
          deleteMinitasksRequest(deleteMinitask);
        });
        commit('deleteMiniTasks', updatedTask.deletedMiniTasks);
      }
      delete updatedTask.miniTasks;
      // Update task in general
      updateTaskRequest(updatedTask);
      dispatch('getTasks');
      commit('updateTask', updatedTask);
    },
    updateMiniTasks: function(
      { commit }: { commit: any },
      { miniTasks }: { miniTasks: any }
    ) {
      const updateMinitasks = miniTasks.filter((val: any) => !val.new);
      if (updateMinitasks.length > 0) {
        var forEachPromise = new Promise((resolve, reject) => {
          updateMinitasks.forEach(
            (updateMinitask: any, index: number, array: any) => {
              updateMinitaskRequest(updateMinitask).then(() => {
                if (index === array.length - 1) resolve();
              });
            }
          );
        });
        forEachPromise.then(() =>
          getMinitasksRequest().then((minitasks: any) =>
            commit('setMiniTasks', minitasks)
          )
        );
      }

      const newMinitasks = miniTasks
        .filter((val: any) => val.new)
        .map((val: any) => {
          delete val.new;
          return val;
        });
      if (newMinitasks.length > 0) {
        let createdMinitasks: any = [];
        var forEachPromise = new Promise((resolve, reject) => {
          newMinitasks.forEach(
            (newMinitask: any, index: number, array: any) => {
              createMinitaskRequest(newMinitask).then((postedNewTask: any) => {
                createdMinitasks.push(postedNewTask);
                if (index === array.length - 1) resolve();
              });
            }
          );
        });
        forEachPromise.then(() =>
          getMinitasksRequest().then((minitasks: any) =>
            commit('setMiniTasks', minitasks)
          )
        );
      }
    },
    deleteTask: function({ commit }: { state: any; commit: any }, taskId: any) {
      deleteTaskRequest(taskId).then(() => commit('deleteTask', taskId));
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
      const i = state.tasks.findIndex(
        (element: any) => element.id == updatedTask.id
      );
      state.tasks.splice(i, 1, updatedTask);
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
    setMiniTasks: function(state: any, miniTasks: any) {
      state.miniTasks = [...miniTasks];
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
