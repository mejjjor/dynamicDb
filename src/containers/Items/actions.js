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
}

export default (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}
