import { bindActionCreators } from "redux"
import {
  initRouter,
  setRouterPath,
  setProjectId,
} from "actions"

const actionCreators = {
  initRouter,
  setRouterPath,
  setProjectId,
}

export default (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}
