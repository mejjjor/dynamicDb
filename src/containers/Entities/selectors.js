import { createSelector } from "reselect"

import {
  getEntitiesSelector,
} from "selectors"

export default createSelector(
  getEntitiesSelector,
  (entities) => {
    return {
      entities,
    }
  }
)
