import firebase from "firebase"

export const saveAll = (action) => {
  firebase.database().ref("/")
  .once("value", (dataSnapshot) => {
    action(dataSnapshot.val())
  })
}

export const load = (data) => {
  firebase.database().ref("/").update(data)
}

export const listenRef = (path, action, key, value) => {
  const ref = firebase.database().ref(path)
  if ( key !== undefined)
    return ref.orderByChild(key).equalTo(value)
    .on("value", (dataSnapshot) => {
      action(dataSnapshot.val())
    })
  else
    return ref.on("value", (dataSnapshot) => {
      action(dataSnapshot.val())
    })
}

export const stopListenRef = (path) => {
  firebase.database().ref(path).off("value")
}

export const getRef = (path, action, key, value) => {
  const ref = firebase.database().ref(path)
  return ref.orderByChild(key).equalTo(value)
  .once("value", (dataSnapshot) => {
    action(dataSnapshot.val())
  })
}

export const removeRef = (path, key, value) => {
  const ref = firebase.database().ref(path)
  ref.orderByChild(key).equalTo(value)
  .remove()
}

export const createRef = (path, newRef) => {
  const key = firebase.database().ref(path).push(newRef).key

  let newChild = {}
  newChild.key = key

  firebase.database().ref(path).child(key).update(newChild)
  return key
}

export const _addField = (entityId, isInitial) => {
  let newField
  if (isInitial) {
    newField = {
      entityId,
      name: "Name",
      type: "Text",
      master: true
    }
  }else {
    newField = {
      entityId,
      name: "new field",
      type: "Text",
    }
  }
  const fieldKey = createRef('fields/data', newField)
  getRef("items/data", (items) => {
    items && Object.keys(items).forEach((itemKey) => {
        firebase.database().ref().child(`items/data/${itemKey}/${fieldKey}`).push("")
    })
  },"entityId", entityId)
}

export const _removeItem = (itemId) => {
  firebase.database().ref()
  .child(`items/data/${itemId}`)
  .remove()
}

export const _removeItemField = (itemId, fieldId) =>{
  firebase.database().ref()
  .child(`items/data/${itemId}/${fieldId}`)
  .remove()
}

export const _removeField = (fieldId, entityId) => {

  entityId && getRef("items/data", (items) => {
      items && Object.keys(items).forEach((itemKey) => {
        _removeItemField(itemKey, fieldId)
      })
    }, "entityId", entityId)



  firebase.database().ref()
  .child(`fields/data/${fieldId}`)
  .remove()
}

export const _removeEntity = (entityId) => {

  getRef("fields/data",(fields) => {
    fields && Object.keys(fields).forEach((fieldKey) => {
      _removeField(fieldKey, entityId)
    })
  }, "entityId", entityId)

  getRef("fields/data",(fields) => {
    fields && Object.keys(fields).forEach((fieldKey) => {
      _removeField(fieldKey, fields[fieldKey].entityId)
    })
  }, "typeEntityId", entityId)

  getRef("items/data",(items) => {
    items && Object.keys(items).forEach((itemKey) => {
      firebase.database().ref()
      .child(`items/data/${itemKey}`)
      .remove()
    })
  }, "entityId", entityId)

  firebase.database().ref()
  .child(`entities/data/${entityId}`)
  .remove()
}

export const _removeProject = (projectId) => {

  getRef("entities/data", (entities) => {
    entities && Object.keys(entities).forEach((entityKey) => {
      _removeEntity(entityKey)
    })
  }, "projectId", projectId)

  firebase.database().ref()
  .child(`projects/data/${projectId}`)
  .remove()
}
