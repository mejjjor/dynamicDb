import {
  GET_ENTITIES,
} from "actions"

const initialState = {
  ids: [],
  entities: {}
}

export default (state = initialState, action) => {

switch (action.type) {
  case GET_ENTITIES:
    if (!action.payload.entities)
      return {...state, entities:{}}
    return {...state, entities: action.payload.entities}

  default:
    return state

  }
}
