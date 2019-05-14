import {
  getGuerabooksRequest,
  getBoardsRequest,
  createBoardRequest,
  deleteSingleBoardRequest,
  updateBoardRequest,
} from '../requests/boardRequests';

export default {
  namespaced: true,
  state: {
    boards: [],
    guerabookId: null,
  },
  actions: {
    createOrSetGuerabook: function({
      state,
      commit,
    }: {
      state: any;
      commit: any;
    }) {
      if (!state.guerabookId) {
        getGuerabooksRequest().then(guerabookId =>
          commit('setGuerabookId', guerabookId)
        );
      }
    },
    getBoards: function({ state, commit }: { state: any; commit: any }) {
      if (state.boards.length == 0) {
        getBoardsRequest().then(boards => commit('setBoards', boards));
      }
    },
    createBoard: function(
      { state, commit }: { state: any; commit: any },
      board: any
    ) {
      createBoardRequest(board.title, state.guerabookId).then(postedBoard =>
        commit('create', postedBoard)
      );
    },
    deleteBoard: function({ commit }: { commit: any }, boardId: any) {
      deleteSingleBoardRequest(boardId).then(() =>
        commit('deleteBoard', boardId)
      );
    },
    updateBoard: function({ commit }: { commit: any }, board: any) {
      commit('updateBoard', board);
    },
  },
  mutations: {
    setGuerabookId: function(state: any, guerabookId: any) {
      state.guerabookId = guerabookId;
    },
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
      updateBoardRequest(board).then(() => {
        const i = state.boards.findIndex((val: any) => val.id == board.id);
        state.boards.splice(i, 1, board);
      });
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
