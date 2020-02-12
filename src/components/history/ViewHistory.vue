<template>
  <div>
    <div class="display-2 py-6 pl-4">View History: </div>
    <v-row dense>
      <v-col
        v-bind="records"
        v-for="recordId in records"
        :key="recordId"
        :cols="4"
      >
        <MovieCard
          v-bind:movie="movieIdMap[recordId]"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MovieCard from '../MovieCard.vue';
import { Selectors } from '../../constants';

export default {
  name: 'ViewHistory',
  props: ['records'],
  components: {
    MovieCard,
  },
  computed: mapGetters({
    movieIdMap: Selectors.selectIdMap,
  }),
};
</script>
