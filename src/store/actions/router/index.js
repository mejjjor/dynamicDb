export const NAVIGATE_TO = "NAVIGATE_TO"
export const navigateTo = (link)=> {
  return {
    type: NAVIGATE_TO,
    payload: {
      link
    }
  }
}

export const NAVIGATE_TO_RELATIVE = "NAVIGATE_TO_RELATIVE"
export const navigateToRelative = (link)=> {
  return {
    type: NAVIGATE_TO_RELATIVE,
    payload: {
      link
    }
  }
}


export const INIT_ROUTER = "INIT_ROUTER"
export const initRouter = (history)=> {
  return {
    type: INIT_ROUTER,
    payload: {
      history,
    }
  }
}


export const SET_ROUTER_PATH = "SET_ROUTER_PATH"
export const setRouterPath = (path)=> {
  return {
    type: SET_ROUTER_PATH,
    payload: {
      path
    }
  }
}


export const SET_PROJECT_ID = "SET_PROJECT_ID"
export const setProjectId = (projectId) => {
  return {
    type: SET_PROJECT_ID,
    payload: {
      projectId
    }
  }
}


export const SET_ENTITY_ID = "SET_ENTITY_ID"
export const setEntityId = (entityId) => {
  return {
    type: SET_ENTITY_ID,
    payload: {
      entityId
    }
  }
}


export const SET_ITEM_ID = "SET_ITEM_ID"
export const setItemId = (itemId) => {
  return {
    type: SET_ITEM_ID,
    payload: {
      itemId
    }
  }
}
