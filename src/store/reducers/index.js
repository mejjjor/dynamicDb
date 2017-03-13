import { combineReducers } from "redux"

import firebase from "./firebase"
import appInfos from "./appInfos"
import router from "./router"
import projects from "./projects"
import entities from "./entities"
import fields from "./fields"
import items from "./items"
import filters from "./filters"

export default combineReducers({
  router,
  firebase,
  projects,
  entities,
  fields,
  items,
  filters,
  appInfos,
})
