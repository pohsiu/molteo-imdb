import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { ACTIONS, MUTATE_ACTIONS } from './constants';

Vue.use(Vuex);
const api = '4b3ad490b310045f6e7bd1cf0f9fd8ff';

export default new Vuex.Store({
  state: {
    movies: [],
    selectedMovie: {},
  },
  mutations: {
    [MUTATE_ACTIONS.UPDATE_MOVIES](state, data) {
      state.movies = data.movies;
    },
  },
  actions: {
    async [ACTIONS.GET_MOVIES]({ commit }, data) {
      const { params } = data;
      try {
        const response = await axios({
          method: 'get',
          baseURL: 'https://api.themoviedb.org/3/discover/movie',
          params: { // Default params
            api_key: api,
            language: 'en-US',
            sort_by: 'popularity.desc',
            include_adult: 'false',
            include_video: 'false',
            page: 1,
            ...params,
          },
        });
        commit(MUTATE_ACTIONS.UPDATE_MOVIES, { movies: response.data.results });
      } catch (e) {
        // TODO: Error Handling
        console.log('fecth Movies Error', e);
      }
    },
  },
  getters: {
  },
});
