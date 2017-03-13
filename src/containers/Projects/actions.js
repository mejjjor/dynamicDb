import { bindActionCreators } from "redux"
import {
  navigateTo,
  navigateToRelative,
  addProject,
  getProjects,
  removeProject,
} from "actions"

const actionCreators = {
  navigateTo,
  navigateToRelative,
  addProject,
  getProjects,
  removeProject,
}

export default (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}
