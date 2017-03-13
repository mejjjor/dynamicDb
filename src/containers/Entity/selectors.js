import { createSelector } from "reselect"

import {
  getEntitiesSelector,
  getFieldsSelector,
} from "selectors"



export default createSelector(
  getEntitiesSelector,
  getFieldsSelector,
  (entities, fields) => {
    return {
      entities,
      fields,
    }
  }
)
