import { createSelector } from "reselect"

import {
  getItemsSelector,
  getFieldsSelector,
  getItemsRelatedSelector,
  getFieldsRelatedSelector,
  getEntitiesRelatedSelector,
} from "selectors"



export default createSelector(
  getItemsSelector,
  getFieldsSelector,
  getEntitiesRelatedSelector,
  getItemsRelatedSelector,
  getFieldsRelatedSelector,
  (items, fields, entitiesRelated, itemsRelated, fieldsRelated) => {
    return {
      items,
      fields,
      entitiesRelated,
      itemsRelated,
      fieldsRelated,
    }
  }
)
