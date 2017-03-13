import {
  SIGN_IN_FIREBASE,
  SIGN_OUT_FIREBASE,
} from "actions"

const initialState = {
  user: "",
  isAuthenticated: true
}

export default (state = initialState, action) => {

  switch (action.type) {
    case SIGN_IN_FIREBASE:
    return {...state, user: action.payload.user, isAuthenticated: true}

    case SIGN_OUT_FIREBASE:
    return {...state, user: "", isAuthenticated: false}

    default:
      return state

  }
}
