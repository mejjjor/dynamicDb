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
}

export default (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}
