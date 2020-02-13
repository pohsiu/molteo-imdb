<template>
  <v-app-bar
    app
    clipped-left
    color="primary"
    dense
  >
    <v-app-bar-nav-icon @click.stop="clickMenuIcon" />
    <v-toolbar-title class="mr-12 align-center">
      <span class="title">EXPLORE MOVIE</span>
    </v-toolbar-title>
    <v-spacer />
    <v-row
      align="center"
      style="max-width: 650px"
    >
      <v-card-text style="height: 60px;">
        <v-autocomplete
          ref="autocomplete"
          @keydown="onKeydownInput"
          :items="Array.from(records)"
          color="white"
          hide-no-data
          hide-selected
          placeholder="Start typing to Search"
          prepend-icon="search"
          return-object
        ></v-autocomplete>
      </v-card-text>
    </v-row>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { GET_TYPES, ACTIONS, Selectors } from '../constants';

export default {
  name: 'AppBar',
  computed: mapGetters({
    records: Selectors.selectSearchedRecords,
  }),
  methods: {
    ...mapActions({
      clickMenuIcon: ACTIONS.ONCHANGE_DRAWER_OPEN,
    }),
    ...mapActions([
      ACTIONS.GET_MOVIES,
    ]),
    onKeydownInput(event) {
      if (event.target.value && event.keyCode === 13) {
        this.$refs.autocomplete.isMenuActive = false;
        this[ACTIONS.GET_MOVIES]({
          params: {
            query: event.target.value,
          },
          type: GET_TYPES.SEARCH,
        });
      }
    },
  },
};
</script>
