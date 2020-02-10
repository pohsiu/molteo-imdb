export const MUTATE_ACTIONS = {
  UPDATE_MOVIES: 'UPDATE_MOVIES',
  UPDATE_SELECTED_MOVIE: 'UPDATE_SELECTED_MOVIE',
  SET_CURRENT_SEARCH: 'SET_CURRENT_SEARCH',
  UPDATE_SEARCH_HISTORY: 'UPDATE_SEARCH_HISTORY',
  UPDATE_SELECTED_HISTORY: 'UPDATE_SELECTED_HISTORY',
  SET_FOCUS_ITEM: 'SET_FOCUS_ITEM',
  SET_DRAWER_OPEN: 'SET_DRAWER_OPEN',
};

export const ACTIONS = {
  GET_MOVIES: 'GET_MOVIES',
  GET_MOVIE_DETIAL: 'GET_MOVIE_DETIAL',
  FIND_MOVIES: 'FIND_MOVIES',
  ONCHANGE_FOCUS_ITEM: 'ONCHANGE_FOCUS_ITEM',
  ONCHANGE_DRAWER_OPEN: 'ONCHANGE_DRAWER_OPEN',
};

export const GET_TYPES = {
  DISCOVER: 'discover',
  SEARCH: 'search',
};

export const defaultConfigMap = {
  [GET_TYPES.DISCOVER]: {
    language: 'en-US',
    sort_by: 'popularity.desc',
    include_adult: 'false',
    include_video: 'false',
    page: 1,
  },
  [GET_TYPES.SEARCH]: {
    language: 'en-US',
    include_adult: 'false',
    page: 1,
  },
};

export const Selectors = {
  selectDiscovers: 'selectDiscovers',
  selectSearchs: 'selectSearchs',
  selectCurrentSearch: 'selectCurrentSearch',
  selectIdMap: 'selectIdMap',
  selectFocusNaviPage: 'selectFocusNaviPage',
  selectDrawerOpen: 'selectDrawerOpen',
  selectSearchedRecords: 'selectSearchedRecords',
  selectSelectedRecords: 'selectSelectedRecords',
  selectFocusNaviIndex: 'selectFocusNaviIndex',
};
