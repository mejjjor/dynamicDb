import { GET_PROJECTS } from "actions"

const initialState = {
  ids: [],
  projects: {}
}

export default (state = initialState, action) => {

  switch (action.type) {
    case GET_PROJECTS:
      if (!action.payload.projects)
        return {...state, projects:{}}
      return {...state, projects: action.payload.projects}

    default:
      return state

  }
}
