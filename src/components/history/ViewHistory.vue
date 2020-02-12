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
        <v-card>
          <v-img
            v-if="movieIdMap[recordId].poster_path"
            :src="imgBaseUrl + movieIdMap[recordId].poster_path"
            class="white--text align-end hoverable"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title
              class="headline mb-1"
              v-text="movieIdMap[recordId].original_title">
            </v-card-title>
            <v-card-subtitle
              class="white--text"
              v-text="formatReleaseDate(movieIdMap[recordId].release_date)">
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
              v-text="movieIdMap[recordId].original_title">
            </v-card-title>
            <v-card-subtitle
              class="white--text"
              v-text="formatReleaseDate(movieIdMap[recordId].release_date)">
            </v-card-subtitle>
          </v-img>
          <v-card-actions>
            <DetailDialog
              v-bind:formatReleaseDate="formatReleaseDate"
              v-bind:imgBaseUrl="imgBaseUrl"
              v-bind:movie="movieIdMap[recordId]"
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import DetailDialog from '../DetailDialog.vue';
import { Selectors } from '../../constants';

export default {
  name: 'ViewHistory',
  props: ['records'],
  data() {
    return {
      imgBaseUrl: 'https://image.tmdb.org/t/p/w500/',
    };
  },
  components: {
    DetailDialog,
  },
  computed: mapGetters({
    movieIdMap: Selectors.selectIdMap,
  }),
  methods: {
    formatReleaseDate(date) {
      if (!date) return 'unknown';
      return moment(date).format('MMM DD, YYYY');
    },
  },
};
</script>
