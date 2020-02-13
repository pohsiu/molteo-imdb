<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      @click="() => clickMovieCard(movie.id)"
      :class="{ 'on-hover': hover }">
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
          v-bind:onChangeDialog="(key) => { dialogOpen = key }"
          v-bind:dialog="dialogOpen"
          v-bind:formatReleaseDate="formatReleaseDate"
          v-bind:imgBaseUrl="imgBaseUrl"
          v-bind:movie="movie"
        />
      </v-card-actions>
    </v-card>
  </v-hover>
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
      dialogOpen: false,
    };
  },
  methods: {
    ...mapActions([
      ACTIONS.GET_MOVIE_DETIAL,
    ]),
    clickMovieCard(id) {
      this.dialogOpen = true;
      if (!this.updateMovie) return; // sometime no need update
      this[ACTIONS.GET_MOVIE_DETIAL]({
        movieId: id,
      });
    },
    formatReleaseDate(date) {
      if (!date) return 'unknown';
      return moment(date).format('MMM DD, YYYY');
    },
  },
};
</script>

<style scoped>
.v-card {
  transition: opacity .3s ease-in-out;
  opacity: 0.5;
  cursor: pointer;
}

.v-card:not(.on-hover) {
  opacity: 1;
 }
</style>
