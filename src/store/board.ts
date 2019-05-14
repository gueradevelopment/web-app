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
    createBoard: function(
      { state, commit }: { state: any; commit: any },
      board: any
    ) {
      board.id = state.boards.length;
      commit('create', board);
    },
    deleteBoard: function({ commit }: { commit: any }, boardId: any) {
      commit('deleteBoard', boardId);
    },
    updateBoard: function({ commit }: { commit: any }, board: any) {
      commit('updateBoard', board);
    },
  },
  mutations: {
    setBoards: function(state: any, boards: any) {
      state.boards = boards;
    },
    create: function(state: any, board: any) {
      state.boards = [...state.boards, board];
    },
    deleteBoard: function(state: any, boardId: any) {
      state.boards = state.boards.filter((val: any) => val.id != boardId);
    },
    updateBoard: function(state: any, board: any) {
      const i = state.boards.findIndex((val: any) => val.id == board.id);
      state.boards.splice(i, 1, board);
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
