import {
  STORE_STAGE_DETAILS,
  FETCHED_STAGE_DETAILS
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case STORE_STAGE_DETAILS:
      return {...state, stageValues: {name: action.payload.name, content: action.payload.content,
        instructions: action.payload.instructions, answer: action.payload.answer, timeUntilOneTenthDeduction: action.payload.timeUntilOneTenthDeduction,
        requirements: action.payload.requirements, percentageDeductionPerWrongAnswer: action.payload.percentageDeductionPerWrongAnswer}}
    case FETCHED_STAGE_DETAILS:
      return {...state, createdStage: action.payload}
  }

  return state;
}
