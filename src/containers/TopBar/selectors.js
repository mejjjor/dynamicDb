import { createSelector } from "reselect"

import {
  isAuthenticatedSelector,
  getTitle,
} from "selectors"

export default createSelector(
  isAuthenticatedSelector,
  getTitle,
  (isAuthenticated, title) => {
    return {
      isAuthenticated,
      title,
    }
  }
)
