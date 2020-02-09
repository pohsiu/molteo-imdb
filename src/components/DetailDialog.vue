<template>
  <div>
    <v-btn
      color="primary"
      dark
      @click="onClick"
      @click.stop="dialog = true"
    >
      More Info
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="400"
    >
      <v-card>
        <v-img
          v-if="composeMovie.poster_path"
          :src="imgBaseUrl + composeMovie.poster_path"
          class="white--text align-end hoverable"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="300px"
          width="400px"
        />
        <v-card-title class="headline">{{ composeMovie.title }}</v-card-title>

        <v-card-text>
          {{ composeMovie.overview }}
        </v-card-text>
        <v-card-text>
          Runtime: {{ formatRuntime(composeMovie.runtime) }}
        </v-card-text>
        <v-card-text>
          Release Date: {{ formatReleaseDate(composeMovie.release_date) }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Disagree
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';

export default {
  name: 'DetailDialog',
  props: ['onClick', 'formatReleaseDate', 'imgBaseUrl', 'movie'],
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapState({
      currentMovie: (state) => state.movie.selectedMovie,
    }),
    composeMovie() {
      return {
        ...this.movie,
        ...this.currentMovie,
      };
    },
  },
  methods: {
    formatRuntime(minutes) {
      const hours = moment.duration({ minutes }).hours();
      const lessMinutes = minutes - hours * 60;
      return `${hours}h ${lessMinutes}m`;
    },
  },
};
</script>
