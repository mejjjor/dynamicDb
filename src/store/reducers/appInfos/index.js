import {
  SET_APP_INFOS,
} from "actions"

const initialState = {
  title: "Welcome !",
}

export default (state = initialState, action) => {

switch (action.type) {
  case SET_APP_INFOS:
    return {title: action.payload.appInfos.title}

  default:
    return state

  }
}
