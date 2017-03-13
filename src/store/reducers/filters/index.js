import {
  SET_FILTER,
} from "actions"

const initialState = {
  entityId: "",
  filter: ""
}

export default (state = initialState, action) => {

  switch (action.type) {
    case SET_FILTER:
      return {
        entityId: action.payload.entityId,
        filter: action.payload.filter
      }
    default:
      return state

  }
}
