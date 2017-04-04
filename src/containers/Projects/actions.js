import { bindActionCreators } from "redux"
import {
  navigateTo,
  navigateToRelative,
  addProject,
  getProjects,
  removeProject,
  setProjectChild,
} from "actions"

const actionCreators = {
  navigateTo,
  navigateToRelative,
  addProject,
  getProjects,
  removeProject,
  setProjectChild,
}

export default (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}
