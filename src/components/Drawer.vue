<template>
  <v-navigation-drawer
    :value="drawerOpen"
    app
    clipped
  >
    <v-list dense>
      <v-list-item-group v-model="focusItem" mandatory>
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
      </v-list-item-group>
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
    focusItem: 0,
  }),
  computed: mapState({
    drawerOpen: (state) => state.app.drawerOpen,
  }),
};
</script>
