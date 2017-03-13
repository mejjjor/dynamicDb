import { bindActionCreators } from "redux"

import {
  navigateToRelative,
  addEntity,
  getEntities,
  setProjectId,
  removeEntity,
} from "actions"

const actionCreators = {
  navigateToRelative,
  addEntity,
  getEntities,
  setProjectId,
  removeEntity
}

export default (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}
