import { createSelector } from "reselect"

import {
  getPathSelector,
} from "selectors"

export default createSelector(
  getPathSelector,
  (path) => {
    return {
      path,
    }
  }
)
