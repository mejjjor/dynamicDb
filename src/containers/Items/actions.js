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
}

export default (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}
