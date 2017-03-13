import { createSelector } from "reselect"

import {
  isAuthenticatedSelector,
} from "selectors"

export default createSelector(
  isAuthenticatedSelector,
  (isAuthenticated) => {
    return {
      isAuthenticated,
    }
  }
)
