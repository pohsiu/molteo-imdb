<template>
  <v-container fluid v-if="searchs.length > 0">
    <div class="display-2 py-6 pl-4">Search Results</div>
    <v-row dense>
      <v-col
        v-bind="searchs"
        v-for="movie in searchs"
        :key="movie.id"
        :cols="4"
      >
        <v-card>
          <v-img
            v-if="movie.poster_path"
            :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
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
              v-text="movie.release_date">
            </v-card-subtitle>
          </v-img>
          <!-- TODO: load default image -->
          <v-img
            v-else
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
              v-text="movie.release_date">
            </v-card-subtitle>
          </v-img>
          <v-card-actions>
            <v-btn
              text
              @click="clickMovie(movie.id)"
            >
              More Info
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { ACTIONS } from '../constants';

export default {
  name: 'Searchs',
  computed: mapState({
    searchs: (state) => state.movie.searchs,
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
  },
};
</script>
