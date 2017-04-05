import { createSelector } from "reselect"

import {
  getItemsSelector,
  getFieldsSelector,
  getItemsRelatedSelector,
  getFieldsRelatedSelector,
  getEntitiesRelatedSelector,
  getEntitiesSelector,
} from "selectors"



export default createSelector(
  getItemsSelector,
  getFieldsSelector,
  getEntitiesRelatedSelector,
  getItemsRelatedSelector,
  getFieldsRelatedSelector,
  getEntitiesSelector,
  (items, fields, entitiesRelated, itemsRelated, fieldsRelated, entities) => {
    return {
      items,
      fields,
      entitiesRelated,
      itemsRelated,
      fieldsRelated,
      entities,
    }
  }
)
