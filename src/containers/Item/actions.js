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
  getEntities,
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
  getEntities,
}

export default (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}
