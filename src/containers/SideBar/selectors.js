import { createSelector } from "reselect"

import {
  getEntitiesSelector,
  getProjectsSelector,
  isAuthenticatedSelector,
  getTitle,
} from "selectors"

export default createSelector(
  getEntitiesSelector,
  getProjectsSelector,
  isAuthenticatedSelector,
  getTitle,
  (entities, projects, isAuthenticated, title) => {
    return {
      entities,
      projects,
      isAuthenticated,
      title,
    }
  }
)
