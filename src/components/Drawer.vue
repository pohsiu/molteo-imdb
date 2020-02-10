<template>
  <v-navigation-drawer
    :value="drawerOpen"
    app
    clipped
  >
    <v-list dense>
      <v-list-item-group mandatory :value="focusIndex">
        <v-list-item
          v-for="(item, index) in items"
          :key="item.text"
          @click="() => setFocusItem({ text: item.text, index })"
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
import { mapGetters, mapActions } from 'vuex';
import { Selectors, ACTIONS } from '../constants';

export default {
  name: 'Drawer',
  data: () => ({
    items: [
      { icon: 'home', text: 'HOME' },
      { icon: 'history', text: 'HISTORY' },
    ],
  }),
  computed: mapGetters({
    drawerOpen: Selectors.selectDrawerOpen,
    focusIndex: Selectors.selectFocusNaviIndex,
  }),
  methods: mapActions({
    setFocusItem: ACTIONS.ONCHANGE_FOCUS_ITEM,
  }),
};
</script>
