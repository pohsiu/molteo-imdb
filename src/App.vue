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
        <div v-if="focusNaviPage === 'HOME'">
          <MovieSection
            v-if="searchs.length > 0"
            v-bind:title="'Search Results: '+currentSearch"
            v-bind:movies="searchs"
          />
          <MovieSection title="DISCOVER" v-bind:movies="discovers" />
        </div>
      </v-sheet>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import Drawer from './components/Drawer.vue';
import AppBar from './components/AppBar.vue';
import MovieSection from './components/MovieSection.vue';
import { ACTIONS, GET_TYPES, Selectors } from './constants';

export default {
  name: 'App',
  components: {
    Drawer,
    AppBar,
    MovieSection,
  },
  computed: mapGetters({
    discovers: Selectors.selectDiscovers,
    searchs: Selectors.selectSearchs,
    currentSearch: Selectors.selectCurrentSearch,
    focusNaviPage: Selectors.selectFocusNaviPage,
  }),
  mounted() {
    this.$store.dispatch(ACTIONS.GET_MOVIES, {
      type: GET_TYPES.DISCOVER,
    });
  },
};
</script>
