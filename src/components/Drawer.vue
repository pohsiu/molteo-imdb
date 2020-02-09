<template>
  <v-navigation-drawer
    :value="drawerOpen"
    app
    clipped
  >
    <v-list dense>
      <v-list-item
        v-for="item in items"
        :key="item.text"
        link
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            {{ item.text }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-subheader class="mt-4 grey--text text--darken-1">SUBSCRIPTIONS</v-subheader>
      <v-list-item
        class="mt-4"
        link
      >
        <v-list-item-action>
          <v-icon color="grey darken-1">mdi-plus-circle-outline</v-icon>
        </v-list-item-action>
        <v-list-item-title class="grey--text text--darken-1">Browse Channels</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-action>
          <v-icon color="grey darken-1">mdi-settings</v-icon>
        </v-list-item-action>
        <v-list-item-title class="grey--text text--darken-1">
          Manage Subscriptions
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Drawer',
  data: () => ({
    items: [
      { icon: 'home', text: 'Home' },
      { icon: 'history', text: 'History' },
    ],
  }),
  computed: mapState({
    drawerOpen: (state) => state.app.drawerOpen,
  }),
};
</script>
