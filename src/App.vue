<template>
  <v-app>
    <Drawer />
    <AppBar />
    <v-content>
      <v-sheet
        id="scrolling-techniques-7"
        class="overflow-y-auto"
        max-height="600"
      >
        <MovieSection
          v-if="searchs.length > 0"
          v-bind:title="'Search Results: '+currentSearch"
          v-bind:movies="searchs"
        />
        <MovieSection title="DISCOVER" v-bind:movies="discovers" />
      </v-sheet>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import Drawer from './components/Drawer.vue';
import AppBar from './components/AppBar.vue';
import MovieSection from './components/MovieSection.vue';
import { ACTIONS, GET_TYPES } from './constants';

export default {
  name: 'App',
  components: {
    Drawer,
    AppBar,
    MovieSection,
  },
  computed: mapState({
    discovers: (state) => state.movie.discovers,
    searchs: (state) => state.movie.searchs,
    currentSearch: (state) => state.movie.currentSearch,
  }),
  mounted() {
    this.$store.dispatch(ACTIONS.GET_MOVIES, {
      type: GET_TYPES.DISCOVER,
    });
  },
};
</script>
