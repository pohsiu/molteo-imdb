<template>
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
        v-bind:movie="movie"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import moment from 'moment';
import { mapActions } from 'vuex';
import { ACTIONS } from '../constants';
import DetailDialog from './DetailDialog.vue';

export default {
  name: 'MovieCard',
  props: ['movie', 'updateMovie'],
  components: {
    DetailDialog,
  },
  data() {
    return {
      imgBaseUrl: 'https://image.tmdb.org/t/p/w500/',
    };
  },
  methods: {
    ...mapActions([
      ACTIONS.GET_MOVIE_DETIAL,
    ]),
    clickMovie(id) {
      if (!this.updateMovie) return; // sometime no need update
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
