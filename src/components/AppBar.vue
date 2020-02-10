<template>
  <v-app-bar
    app
    clipped-left
    color="red"
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
      <v-text-field
        @click:append="onSearch"
        @keydown="onKeydownInput"
        placeholder="Search..."
        single-line
        append-icon="search"
        color="white"
        hide-details
      />
    </v-row>
  </v-app-bar>
</template>

<script>
import { mapActions } from 'vuex';
import { GET_TYPES, ACTIONS } from '../constants';

export default {
  name: 'AppBar',
  methods: {
    ...mapActions({
      clickMenuIcon: ACTIONS.ONCHANGE_DRAWER_OPEN,
    }),
    ...mapActions([
      ACTIONS.GET_MOVIES,
    ]),
    onSearch() {
      this[ACTIONS.GET_MOVIES]({
        params: {
          query: this.searchValue,
        },
        type: GET_TYPES.SEARCH,
      });
    },
    onKeydownInput(event) {
      this.searchValue = event.target.value;
      if (event.target.value && event.keyCode === 13) {
        this.onSearch();
      }
    },
  },
};
</script>
