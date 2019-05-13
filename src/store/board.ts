import Data from '../data';

export default {
  namespaced: true,
  state: {
    boards: [],
  },
  actions: {
    getBoards: function({ state, commit }: { state: any; commit: any }) {
      if (state.boards.length == 0) {
        commit('setBoards', Data.boards);
      }
    },
  },
  mutations: {
    setBoards: function(state: any, boards: any) {
      state.boards = boards;
    },
  },
  getters: {
    boards: function(state: any) {
      return state.boards;
    },
    boardDetails: function(state: any) {
      return (boardId: any) =>
        state.boards.find((val: any) => val.id == boardId);
    },
    search: function(state: any) {
      return (query: string) =>
        state.boards.filter((val: any) =>
          val.title.toLowerCase().includes(query)
        );
    },
  },
};
