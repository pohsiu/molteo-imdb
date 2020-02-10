<template>
  <v-container fluid>
    <div class="display-2 py-6 pl-4">{{ title }}</div>
    <v-row dense>
      <v-col
        v-bind="movies"
        v-for="movie in movies"
        :key="movie.id"
        :cols="4"
      >
        <v-card>
          <v-img
            v-if="movie.poster_path"
            :src="imgBaseUrl + movie.poster_path"
            class="white--text align-end hoverable"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title
              class="headline mb-1"
              v-text="movie.original_title">
            </v-card-title>
            <v-card-subtitle
              class="white--text"
              v-text="formatReleaseDate(movie.release_date)">
            </v-card-subtitle>
          </v-img>
          <!-- TODO: load default image -->
          <v-img
            v-else
            class="white--text align-end hoverable"
            :src="'loadfailed'"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title
              class="headline mb-1"
              v-text="movie.original_title">
            </v-card-title>
            <v-card-subtitle
              class="white--text"
              v-text="formatReleaseDate(movie.release_date)">
            </v-card-subtitle>
          </v-img>
          <v-card-actions>
            <DetailDialog
              v-bind:onClick="() => clickMovie(movie.id)"
              v-bind:formatReleaseDate="formatReleaseDate"
              v-bind:imgBaseUrl="imgBaseUrl"
              v-bind:movie="movieIdMap[movie.id]"
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';
import DetailDialog from './DetailDialog.vue';
import { ACTIONS, Selectors } from '../constants';

export default {
  name: 'MovieSection',
  props: ['title', 'movies'],
  components: {
    DetailDialog,
  },
  data() {
    return {
      imgBaseUrl: 'https://image.tmdb.org/t/p/w500/',
    };
  },
  computed: mapGetters({
    movieIdMap: Selectors.selectIdMap,
  }),
  methods: {
    ...mapActions([
      ACTIONS.GET_MOVIE_DETIAL,
    ]),
    clickMovie(id) {
      this[ACTIONS.GET_MOVIE_DETIAL]({
        movieId: id,
      });
      console.log('click Moive', id);
    },
    formatReleaseDate(date) {
      if (!date) return 'unknown';
      return moment(date).format('MMM DD, YYYY');
    },
  },
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
