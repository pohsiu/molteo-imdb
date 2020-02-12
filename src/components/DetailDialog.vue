<template>
  <div>
    <v-btn
      color="primary"
      dark
    >
      More Info
    </v-btn>

    <v-dialog
      :value="dialog"
      @click:outside="() => onChangeDialog(false)"
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
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'DetailDialog',
  props: ['formatReleaseDate', 'imgBaseUrl', 'movie', 'dialog', 'onChangeDialog'],
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
