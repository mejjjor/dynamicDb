import firebase from "firebase"
import { _removeField, _addField } from "utils/firebase"

export const ADD_FIELD = "ADD_FIELD"
export const addField = (projectId, entityId)=> {
  _addField(projectId, entityId)

  return {
    type: ADD_FIELD,
    payload: {
      projectId,
      entityId
    }
  }
}

export const GET_FIELDS = "GET_FIELDS"
export const getFields = (fields)=> {
  return {
    type: GET_FIELDS,
    payload: {
      fields
    }
  }
}

export const SET_FIELD_CHILD = "SET_FIELD_CHILD"
export const setFieldChild = (fieldId, child, value)=> {
  let newChild = {}
  newChild[child] = value
  firebase.database().ref()
  .child(`fields/data/${fieldId}`)
  .update(newChild)

  return {
    type: SET_FIELD_CHILD,
    payload: {
      fieldId,
      child,
      value,
    }
  }
}


export const REMOVE_FIELD = "REMOVE_FIELD"
export const removeField = (fieldId, entityId)=> {
  _removeField(fieldId, entityId)

  return {
    type: REMOVE_FIELD,
    payload: {
      fieldId,
      entityId
    }
  }
}
