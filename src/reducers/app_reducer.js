import {
  STORE_STAGE_DETAILS,
  FETCHED_STAGE_DETAILS,
  FETCH_STAGE_DETAILS,
  FETCH_SEARCH_USER_RESULTS,
  FETCH_SEARCH_GAME_RESULTS,
  FETCH_SEARCH_STAGE_RESULTS
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case STORE_STAGE_DETAILS:
      return {...state, stageValues: {name: action.payload.name, content: action.payload.content,
        instructions: action.payload.instructions, answer: action.payload.answer, timeUntilOneTenthDeduction: action.payload.timeUntilOneTenthDeduction,
        requirements: action.payload.requirements, percentageDeductionPerWrongAnswer: action.payload.percentageDeductionPerWrongAnswer}}
    case FETCHED_STAGE_DETAILS:
      return {...state, createdStage: action.payload}
    case FETCH_STAGE_DETAILS:
      return {...state, stage: action.payload}
    case FETCH_SEARCH_USER_RESULTS:
      return {...state, userResults: action.payload}
    case FETCH_SEARCH_GAME_RESULTS:
      return {...state, gameResults: action.payload}
    case FETCH_SEARCH_STAGE_RESULTS:
      return {...state, stageResults: action.payload}
  }

  return state;
}