import {
  GET_ITEMS,
} from "actions"

const initialState = {
  ids: [],
  items: {}
}

export default (state = initialState, action) => {

switch (action.type) {
  case GET_ITEMS:
    if (!action.payload.items)
      return {...state, items:{}}
    return {...state, items: action.payload.items}

  default:
    return state

  }
}
