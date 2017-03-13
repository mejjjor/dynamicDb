import { bindActionCreators } from "redux"
import {
  navigateTo,
  getFields,
  addField,
  setFieldChild,
  getEntities,
  setEntityChild,
  removeField,
  setProjectId,
  setEntityId,
} from "actions"

const actionCreators = {
  navigateTo,
  getFields,
  addField,
  setFieldChild,
  getEntities,
  setEntityChild,
  removeField,
  setProjectId,
  setEntityId,
}

export default (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}
