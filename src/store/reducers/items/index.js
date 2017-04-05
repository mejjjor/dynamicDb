import {
  GET_ITEMS,
  GET_ITEMS_RELATED,
} from "actions"

const initialState = {
  ids: [],
  items: {},
  itemsRelated: {},
}

export default (state = initialState, action) => {

switch (action.type) {
  case GET_ITEMS:
    if (!action.payload.items)
      return {...state, items:{}}
    return {...state, items: action.payload.items}

  case GET_ITEMS_RELATED: {
    const itemsRelated = {...state.itemsRelated}
    action.payload.items && Object.keys(action.payload.items).forEach((itemKey) => {
      itemsRelated[itemKey] = action.payload.items[itemKey]
    })

    return {...state, itemsRelated}
  }


  default:
    return state

  }
}
