import { createSelector } from "reselect"

import {
  getItemsSelector,
  getFieldsSelector,
} from "selectors"

export default createSelector(
  getItemsSelector,
  getFieldsSelector,
  (items, fields) => {
    return {
      items,
      fields,
    }
  }
)
