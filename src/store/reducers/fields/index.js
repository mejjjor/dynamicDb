import {
  GET_FIELDS,
} from "actions"

const initialState = {
  ids: [],
  fields: {}
}

export default (state = initialState, action) => {

  switch (action.type) {
    case GET_FIELDS:
      if (!action.payload.fields)
        return {...state, fields:{}}
      return {...state, fields:action.payload.fields}

    default:
      return state

  }
}
