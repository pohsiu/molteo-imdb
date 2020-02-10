<template>
  <v-navigation-drawer
    :value="drawerOpen"
    app
    clipped
  >
    <v-list dense>
      <v-list-item-group mandatory>
        <v-list-item
          v-for="item in items"
          :key="item.text"
          @click="() => onChangeFocusItem({ value: item.text })"
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
import { mapGetters, mapMutations } from 'vuex';
import { Selectors } from '../constants';

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
  }),
  methods: mapMutations(['onChangeFocusItem']),
};
</script>
