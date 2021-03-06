import {
  STORE_STAGE_DETAILS,
  FETCHED_STAGE_DETAILS,
  FETCH_STAGE_DETAILS,
  FETCH_SEARCH_USER_RESULTS,
  FETCH_SEARCH_GAME_RESULTS,
  FETCH_SEARCH_STAGE_RESULTS,
  UPDATING_GAME,
  FETCH_GAME_DETAILS,
  SAVE_STAGE_SUMMARY,
  CREATE_GAME_INSTANCE_AND_REDIRECT,
  CLEAR_TEAM,
  ADD_USER_TO_TEAM,
  GO_TO_FIRST_STAGE,
  GO_TO_NEXT_STAGE,
  FINALIZE_GAME,
  UPDATE_STAGE_INSTANCE
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
    case UPDATING_GAME:
      return {...state, gameData: {updatingGame: action.payload.updateGame, nameOfGame: action.payload.nameOfGame}}
    case FETCH_GAME_DETAILS:
      return {...state, gameDetails: action.payload}
    case SAVE_STAGE_SUMMARY:
      return {...state, savedStageSummary: action.payload}
    case CREATE_GAME_INSTANCE_AND_REDIRECT:
      return {...state, latestGameInstance: action.payload}
    case CLEAR_TEAM:
      return {...state, latestTeam: action.payload}
    case ADD_USER_TO_TEAM:
      return {...state, latestTeam: action.payload}
    case GO_TO_FIRST_STAGE:
      return {...state, latestStageInstance: action.payload.latestStageInstance, latestStage: action.payload.latestStage}
    case GO_TO_NEXT_STAGE:
      return {...state, latestStageInstance: action.payload.latestStageInstance, latestStage: action.payload.latestStage}
    case FINALIZE_GAME:
      return {...state, latestFinishedGameInstance: action.payload}
    case UPDATE_STAGE_INSTANCE:
      return {...state, latestStageInstance: action.payload}
  }
  return state;
}
