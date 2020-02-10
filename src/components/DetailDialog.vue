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
          v-if="movie.poster_path"
          :src="imgBaseUrl + movie.poster_path"
          class="white--text align-end hoverable"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="300px"
          width="400px"
        />
        <v-card-title class="headline">{{ movie.title }}</v-card-title>

        <v-card-text>
          {{ movie.overview }}
        </v-card-text>
        <v-card-text>
          Runtime: {{ formatRuntime(movie.runtime) }}
        </v-card-text>
        <v-card-text>
          Release Date: {{ formatReleaseDate(movie.release_date) }}
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
import moment from 'moment';

export default {
  name: 'DetailDialog',
  props: ['onClick', 'formatReleaseDate', 'imgBaseUrl', 'movie'],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    formatRuntime(minutes) {
      if (!minutes) return 'unknown';
      const hours = moment.duration({ minutes }).hours();
      const lessMinutes = minutes - hours * 60;
      return `${hours}h ${lessMinutes}m`;
    },
  },
};
</script>
