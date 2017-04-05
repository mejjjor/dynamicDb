import {
  GET_FIELDS,
  GET_FIELDS_RELATED,
} from "actions"

const initialState = {
  ids: [],
  fields: {},
  fieldsRelated: {}
}

export default (state = initialState, action) => {

  switch (action.type) {
    case GET_FIELDS:
      if (!action.payload.fields)
        return {...state, fields:{}}
      return {...state, fields:action.payload.fields}

    case GET_FIELDS_RELATED: {
      const fieldsRelated = {...state.fieldsRelated}
      Object.keys(action.payload.fields).forEach((fieldKey) => {
        fieldsRelated[fieldKey] = action.payload.fields[fieldKey]

      })

      return {...state, fieldsRelated}
    }

    default:
      return state

  }
}
