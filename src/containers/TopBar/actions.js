import { bindActionCreators } from "redux"

import {
  navigateTo,
} from "actions"

const actionCreators = {
  navigateTo,
}

export default (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}
