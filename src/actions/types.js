// Authorization action types

// Authentication types

export const AUTH_USER = 'auth_user';
export const UNAUTH_USER = 'unauth_user'
export const LOGOUT_USER = 'logout_user';
export const AUTH_ERROR = 'auth_error';
export const FETCH_MESSAGE = 'fetch_message';

// Stage types

export const STORE_STAGE_DETAILS =  'store_stage_details';
export const FETCHED_STAGE_DETAILS = 'fetched_stage_details';
export const CREATE_STAGE = 'create_stage';
export const FETCH_STAGE_DETAILS = 'fetch_stage_details';

// Search types

export const FETCH_SEARCH_USER_RESULTS = 'fetch_search_user_results';
export const FETCH_SEARCH_GAME_RESULTS = 'fetch_search_game_results';
export const FETCH_SEARCH_STAGE_RESULTS = 'fetch_search_stage_results';

// GameInstance types

export const ADD_USER_TO_TEAM = 'add_user_to_team';
export const CLEAR_TEAM = 'clear_team';
export const CREATE_GAME_INSTANCE_AND_REDIRECT = 'create_game_instance_and_redirect';
export const GO_TO_FIRST_STAGE = 'go_to_first_stage';
export const FINALIZE_GAME = 'finalize_game';

// StageInstance types

export const GO_TO_NEXT_STAGE = 'go_to_next_stage';
export const UPDATE_STAGE_INSTANCE = 'update_stage_instance';
