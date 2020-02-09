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
        <Searchs />
        <Discover/>
      </v-sheet>
    </v-content>
  </v-app>
</template>

<script>
import Discover from './components/Discover.vue';
import Drawer from './components/Drawer.vue';
import AppBar from './components/AppBar.vue';
import Searchs from './components/Searchs.vue';

export default {
  name: 'App',
  components: {
    Drawer,
    AppBar,
    Searchs,
    Discover,
  },
};
</script>
