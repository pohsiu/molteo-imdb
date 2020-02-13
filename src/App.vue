<template>
  <v-app>
    <Drawer />
    <AppBar />
    <v-content>
      <v-sheet
        id="scrolling-techniques-7"
        class="overflow-y-auto"
      >
        <!-- TODO: might compose router feature -->
        <div v-if="focusNaviPage === 'HOME'">
          <MovieSection
            v-bind:title="'Search Results: '+currentSearch"
            v-bind:movies="searchs"
          />
          <MovieSection title="DISCOVER" v-bind:movies="discovers" />
        </div>
        <v-container fluid v-if="focusNaviPage === 'HISTORY'" style="height: 100vh;">
          <SearchHistroy v-bind:records="searchedMvRecords" />
          <ViewHistory v-bind:records="selectedMvRecords" />
        </v-container>
      </v-sheet>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import Drawer from './components/Drawer.vue';
import AppBar from './components/AppBar.vue';
import MovieSection from './components/MovieSection.vue';
import SearchHistroy from './components/history/SearchHistory.vue';
import ViewHistory from './components/history/ViewHistory.vue';
import { ACTIONS, GET_TYPES, Selectors } from './constants';

export default {
  name: 'App',
  components: {
    Drawer,
    AppBar,
    MovieSection,
    SearchHistroy,
    ViewHistory,
  },
  computed: mapGetters({
    discovers: Selectors.selectDiscovers,
    searchs: Selectors.selectSearchs,
    currentSearch: Selectors.selectCurrentSearch,
    focusNaviPage: Selectors.selectFocusNaviPage,
    searchedMvRecords: Selectors.selectSearchedRecords,
    selectedMvRecords: Selectors.selectSelectedRecords,
  }),
  mounted() {
    this.$store.dispatch(ACTIONS.GET_MOVIES, {
      type: GET_TYPES.DISCOVER,
    });
  },
};
</script>
