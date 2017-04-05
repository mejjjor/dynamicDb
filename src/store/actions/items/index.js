import firebase from "firebase"
import { getRef, _removeItem } from "utils/firebase"


export const ADD_ITEM = "ADD_ITEM"
export const addItem = (entityId)=> {
  let newEntry
  getRef("fields/data", (fields) => {
    const newitem = fields && Object.keys(fields).reduce((acc, fieldKey) => {
      acc[fieldKey] = ""
      return acc
    },{entityId})

    newEntry = firebase.database().ref().child('items/data').push(newitem || {entityId}).key
  }, "entityId", entityId)

  firebase.database().ref(`items/data/${newEntry}`).once("value", (item) => {
    const itemVal = item.val()
    itemVal && Object.keys(itemVal).forEach((entryKey) => {
      if (entryKey !== "entityId") {
        firebase.database().ref().child(`items/data/${newEntry}/${entryKey}`).push("")
      }
    })
  })

  return {
    type: ADD_ITEM,
    payload: {
      entityId
    }
  }
}


export const ADD_ITEM_CHILD = "ADD_ITEM_CHILD"
export const addItemChild = (entityId, childId)=> {

  firebase.database().ref().child(`items/data/${entityId}/${childId}`).push("")

  return {
    type: ADD_ITEM_CHILD,
    payload: {
      entityId,
      childId
    }
  }
}


export const GET_ITEMS = "GET_ITEMS"
export const getItems = (items)=> {
  return {
    type: GET_ITEMS,
    payload: {
      items
    }
  }
}

export const GET_ITEMS_RELATED = "GET_ITEMS_RELATED"
export const getItemsRelated = (items)=> {
  return {
    type: GET_ITEMS_RELATED,
    payload: {
      items
    }
  }
}



export const SET_ITEM_CHILD = "SET_ITEM_CHILD"
export const setItemChild = (itemId, child, key, value)=> {
  let newChild = {}
  newChild[key] = value

  firebase.database().ref()
  .child(`items/data/${itemId}/${child}`)
  .update(newChild)

  return {
    type: SET_ITEM_CHILD,
    payload: {
      itemId,
      child,
      key,
      value,
    }
  }
}


export const REMOVE_ITEM_CHILD = "REMOVE_ITEM_CHILD"
export const removeItemChild = (itemId, keyId)=> {
  firebase.database().ref()
  .child(`items/data/${itemId}/${keyId}`)
  .remove()

  return {
    type: REMOVE_ITEM_CHILD,
    payload: {
      itemId,
      keyId
    }
  }
}


export const REMOVE_ITEM_ENTRY = "REMOVE_ITEM_ENTRY"
export const removeItemEntry = (itemId, keyId, entryId)=> {
  firebase.database().ref()
  .child(`items/data/${itemId}/${keyId}/${entryId}`)
  .remove()

  return {
    type: REMOVE_ITEM_ENTRY,
    payload: {
      itemId,
      keyId,
      entryId,
    }
  }
}


export const REMOVE_ITEM = "REMOVE_ITEM"
export const removeItem = (itemId)=> {
  _removeItem(itemId)

  return {
    type: REMOVE_ITEM,
    payload: {
      itemId
    }
  }
}
