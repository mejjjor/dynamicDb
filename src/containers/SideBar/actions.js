import { bindActionCreators } from "redux"

import {
  navigateTo,
  getEntities,
  getProjects,
} from "actions"

const actionCreators = {
  navigateTo,
  getEntities,
  getProjects,
}

export default (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}
