import { bindActionCreators } from "redux"

import {
  navigateToRelative,
  setItemChild,
  getItems,
  getFields,
  addItemChild,
  removeItemEntry,
  setProjectId,
  setEntityId,
  setItemId,
  getItemsRelated,
  getFieldsRelated,
} from "actions"

const actionCreators = {
  navigateToRelative,
  setItemChild,
  getItems,
  getFields,
  addItemChild,
  removeItemEntry,
  setProjectId,
  setEntityId,
  setItemId,
  getItemsRelated,
  getFieldsRelated,
}

export default (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}
