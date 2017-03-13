import { createSelector } from "reselect"

import {
  getProjectsSelector,
} from "selectors"

export default createSelector(
  getProjectsSelector,
  (projects) => {
    return {
      projects,
    }
  }
)
