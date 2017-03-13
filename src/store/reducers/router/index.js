import {
  NAVIGATE_TO,
  NAVIGATE_TO_RELATIVE,
  INIT_ROUTER,
  SET_ROUTER_PATH,
  SET_PROJECT_ID,
  SET_ENTITY_ID,
  SET_ITEM_ID,
} from "actions"


const initialState =  {
  path: "/",
  history: "",
  projectId: "",
  entityId: "",
  itemId: "",
}


export default (state = initialState, action) => {

switch (action.type) {
  case NAVIGATE_TO: {
    const path = /\/$/.exec(action.payload.link)?action.payload.link:action.payload.link+"/"
    state.history.push(path)
    return { ...state, path }
  }

  case NAVIGATE_TO_RELATIVE: {
    let path = /\/$/.exec(state.path)?state.path:state.path+"/"
    path += /\/$/.exec(action.payload.link)?action.payload.link:action.payload.link+"/"
    state.history.push(path)
    return { ...state, path }
  }

  case INIT_ROUTER:
    return { ...state, history: action.payload.history }

  case SET_ROUTER_PATH:{
    const path = /\/$/.exec(action.payload.path)?action.payload.path:action.payload.path+"/"
    return { ...state, path}
  }

  case SET_PROJECT_ID:
    return {...state, projectId: action.payload.projectId}


  case SET_ENTITY_ID:
    return {...state, entityId: action.payload.entityId}


  case SET_ITEM_ID:
    return {...state, itemId: action.payload.itemId}


  default:
    return state

}
}
