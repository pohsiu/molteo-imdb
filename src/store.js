import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import {
  ACTIONS,
  MUTATE_ACTIONS,
  GET_TYPES,
  defaultConfigMap,
} from './constants';

Vue.use(Vuex);
const api = '4b3ad490b310045f6e7bd1cf0f9fd8ff';

// TODO refactor as two modules
export default new Vuex.Store({
  state: {
    movie: {
      discovers: [],
      searchs: [],
      currentSearch: '',
      selectedMovie: {},
    },
    app: {
      drawerOpen: true,
    },
  },
  mutations: {
    // Movie Module
    [MUTATE_ACTIONS.UPDATE_MOVIES](state, data) {
      const { type, movies } = data;
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
      state.movie.selectedMovie = data.movie;
    },
    // App Module
    setDrawerOpen(state) {
      const { app: { drawerOpen } } = state;
      state.app.drawerOpen = !drawerOpen;
    },
  },
  actions: {
    async [ACTIONS.GET_MOVIES]({ commit }, data) {
      const { type, params } = data;
      if (type === GET_TYPES.SEARCH) {
        commit(MUTATE_ACTIONS.SET_CURRENT_SEARCH, { currentSearch: params.query });
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
            ...params,
          },
        });
        console.log('Get Movie Detail', response.data);
        commit(MUTATE_ACTIONS.UPDATE_SELECTED_MOVIE, { movie: response.data });
      } catch (e) {
        // TODO: Error Handling
        console.log('fecth Movie Detail Error', e);
      }
    },
  },
  getters: {
  },
});
