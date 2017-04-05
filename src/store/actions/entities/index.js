import firebase from "firebase"
import { createRef, _removeEntity, _addField } from "utils/firebase"

export const ADD_ENTITY = "ADD_ENTITY"
export const addEntity = (projectId)=> {
  const newEntity = {
    name: "new entity",
    projectId
  }

  const key = createRef('entities/data', newEntity)
  _addField(key, true)

  return {
    type: ADD_ENTITY,
    payload: {
      projectId
    }
  }
}

export const GET_ENTITIES = "GET_ENTITIES"
export const getEntities = (entities)=> {
  return {
    type: GET_ENTITIES,
    payload: {
      entities
    }
  }
}


export const SET_ENTITY_CHILD = "SET_ENTITY_CHILD"
export const setEntityChild = (entityId, child, value)=> {
  let newChild = {}
  newChild[child] = value

  firebase.database().ref()
  .child(`entities/data/${entityId}`)
  .update(newChild)

  return {
    type: SET_ENTITY_CHILD,
    payload: {
      entityId,
      child,
      value
    }
  }
}


export const REMOVE_ENTITY = "REMOVE_ENTITY"
export const removeEntity = (entityId)=> {
  _removeEntity(entityId)

  return {
    type: REMOVE_ENTITY,
    payload: {
      entityId
    }
  }
}
