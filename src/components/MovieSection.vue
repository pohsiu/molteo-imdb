<template>
  <v-container fluid>
    <div class="display-2 py-6 pl-4">{{ title }}</div>
    <v-row dense>
      <v-col
        v-bind="movies"
        v-for="movie in movies"
        :key="movie.id"
        :cols="12"
        :sm="4"
      >
        <MovieCard
          v-bind:movie="movieIdMap[movie.id]"
          :updateMovie="true"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import MovieCard from './MovieCard.vue';
import { Selectors } from '../constants';

export default {
  name: 'MovieSection',
  props: ['title', 'movies'],
  components: {
    MovieCard,
  },
  computed: mapGetters({
    movieIdMap: Selectors.selectIdMap,
  }),
};
</script>

<style>
/* .truncateTitle {
  font-size: 1.4rem;
  text-overflow: ellipsis;
  margin: 12px 16px;
  font-weight: 500;
  -webkit-line-clamp: 2;
  white-space: normal;
  overflow: hidden;
  max-height: 4rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  cursor: pointer;
}
.hoverable {
  cursor: pointer;
} */
</style>
