
export const SET_FILTER = "SET_FILTER"
export const setFilter = (entityId, filter)=> {
  return {
    type: SET_FILTER,
    payload: {
      entityId,
      filter
    }
  }
}
