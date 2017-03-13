export const SET_APP_INFOS = "SET_APP_INFOS"
export const setAppInfos = (appInfos)=> {
  return {
    type: SET_APP_INFOS,
    payload: {
      appInfos
    }
  }
}
