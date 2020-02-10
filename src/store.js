import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import {
  ACTIONS,
  MUTATE_ACTIONS,
  GET_TYPES,
  defaultConfigMap,
  Selectors,
} from './constants';

Vue.use(Vuex);
const api = '4b3ad490b310045f6e7bd1cf0f9fd8ff';

// TODO refactor as two modules
export default new Vuex.Store({
  state: {
    movie: {
      idMap: {},
      discovers: [],
      searchs: [],
      currentSearch: '',
    },
    history: {
      selectedMovies: [], // MovieId[]
      searchedMovies: [], // SearchString[]
    },
    app: {
      drawerOpen: true,
      focusNaviPage: 'HOME',
      focusNaviIndex: 0,
    },
  },
  mutations: {
    // Movie Module
    [MUTATE_ACTIONS.UPDATE_MOVIES](state, data) {
      const { type, movies } = data;
      movies.map((movie) => {
        state.movie.idMap[movie.id] = movie;
        return null;
      });
      if (type === GET_TYPES.DISCOVER) {
        state.movie.discovers = movies;
      }
      if (type === GET_TYPES.SEARCH) {
        state.movie.searchs = movies;
      }
    },
    [MUTATE_ACTIONS.SET_CURRENT_SEARCH](state, data) {
      state.movie.currentSearch = data.currentSearch;
    },
    [MUTATE_ACTIONS.UPDATE_SELECTED_MOVIE](state, data) {
      const { movie } = data;
      const { idMap } = state.movie;
      idMap[movie.id] = movie;
      state.movie.idMap = { ...idMap };
    },
    // History Module
    [MUTATE_ACTIONS.UPDATE_SELECTED_HISTORY](state, data) {
      const { selectedMovies } = state.history;
      state.history.selectedMovies = [data.movie.id, ...selectedMovies];
    },
    [MUTATE_ACTIONS.UPDATE_SEARCH_HISTORY](state, data) {
      const { searchedMovies } = state.history;
      state.history.searchedMovies = [data.currentSearch, ...searchedMovies];
    },
    // App Module
    [MUTATE_ACTIONS.SET_DRAWER_OPEN](state) {
      const { app: { drawerOpen } } = state;
      state.app.drawerOpen = !drawerOpen;
    },
    [MUTATE_ACTIONS.SET_FOCUS_ITEM](state, data) {
      state.app.focusNaviPage = data.text;
      state.app.focusNaviIndex = data.index;
    },
  },
  actions: {
    async [ACTIONS.GET_MOVIES]({ commit }, data) {
      const { type, params } = data;
      if (type === GET_TYPES.SEARCH) {
        commit(MUTATE_ACTIONS.SET_FOCUS_ITEM, { text: 'HOME', index: 0 });
        commit(MUTATE_ACTIONS.SET_CURRENT_SEARCH, { currentSearch: params.query });
        commit(MUTATE_ACTIONS.UPDATE_SEARCH_HISTORY, { currentSearch: params.query });
      }
      try {
        const response = await axios({
          method: 'get',
          baseURL: `https://api.themoviedb.org/3/${type}/movie`,
          params: { // Default params
            api_key: api,
            ...defaultConfigMap[type],
            ...params,
          },
        });
        commit(MUTATE_ACTIONS.UPDATE_MOVIES, { type, movies: response.data.results });
      } catch (e) {
        // TODO: Error Handling
        console.log(`${type} Movies Error`, e);
      }
    },
    async [ACTIONS.GET_MOVIE_DETIAL]({ commit }, data) {
      const { movieId, params } = data;
      try {
        const response = await axios({
          method: 'get',
          baseURL: `https://api.themoviedb.org/3/movie/${movieId}`,
          params: {
            api_key: api,
            language: 'en-US',
            append_to_response: 'credits', // get cast/creat
            ...params,
          },
        });
        console.log('Get Movie Detail', response.data);
        commit(MUTATE_ACTIONS.UPDATE_SELECTED_MOVIE, { movie: response.data });
        commit(MUTATE_ACTIONS.UPDATE_SELECTED_HISTORY, { movie: response.data });
      } catch (e) {
        // TODO: Error Handling
        console.log('fecth Movie Detail Error', e);
      }
    },
    [ACTIONS.ONCHANGE_FOCUS_ITEM]({ commit }, data) {
      commit(MUTATE_ACTIONS.SET_FOCUS_ITEM, data);
    },
    [ACTIONS.ONCHANGE_DRAWER_OPEN]({ commit }, data) {
      commit(MUTATE_ACTIONS.SET_DRAWER_OPEN, data);
    },
  },
  getters: {
    // Movie Getter
    [Selectors.selectDiscovers]: (state) => state.movie.discovers,
    [Selectors.selectSearchs]: (state) => state.movie.searchs,
    [Selectors.selectCurrentSearch]: (state) => state.movie.currentSearch,
    [Selectors.selectIdMap]: (state) => state.movie.idMap,
    // History Getter
    [Selectors.selectSearchedRecords]: (state) => state.history.searchedMovies,
    [Selectors.selectSelectedRecords]: (state) => state.history.selectedMovies,
    // App Getter
    [Selectors.selectFocusNaviPage]: (state) => state.app.focusNaviPage,
    [Selectors.selectFocusNaviIndex]: (state) => state.app.focusNaviIndex,
    [Selectors.selectDrawerOpen]: (state) => state.app.drawerOpen,
  },
});
