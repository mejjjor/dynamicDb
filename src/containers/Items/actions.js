import { bindActionCreators } from "redux"

import {
  navigateToRelative,
  addItem,
  getItems,
  getFields,
  setProjectId,
  setEntityId,
  setFilter,
  removeItem,
  getItemsRelated,
  getFieldsRelated,
  getEntities,
} from "actions"

const actionCreators = {
  navigateToRelative,
  addItem,
  getItems,
  getFields,
  setProjectId,
  setEntityId,
  setFilter,
  removeItem,
  getItemsRelated,
  getFieldsRelated,
  getEntities,
}

export default (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}
