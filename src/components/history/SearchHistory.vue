<template>
  <div>
    <div class="display-2 py-6 pl-4">SearchHistory: </div>
    <v-list-item
      v-for="(record, i) in records"
      :key="i"
      @click="onClickItem(record)"
    >
     {{ record }}
    </v-list-item>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { ACTIONS, GET_TYPES } from '../../constants';

export default {
  name: 'SearchHistory',
  props: ['records'],
  methods: {
    ...mapActions({
      setFocusItem: ACTIONS.ONCHANGE_FOCUS_ITEM,
    }),
    ...mapActions([
      ACTIONS.GET_MOVIES,
    ]),
    onSearch(query) {
      this[ACTIONS.GET_MOVIES]({
        params: { query },
        type: GET_TYPES.SEARCH,
      });
    },
    onClickItem(text) {
      this.onSearch(text);
      this.setFocusItem({ text: 'HOME', index: 0 });
    },
  },
};
</script>
