import { createSelector } from "reselect"

import {
  getItemsSelector,
  getFieldsSelector,
  getItemsRelatedSelector,
  getFieldsRelatedSelector,
} from "selectors"

const getEntitiesRelated = createSelector(
  getFieldsSelector,
  (fields) => {
    return Object.keys(fields)
    .filter((fieldKey) => {
      return fields[fieldKey].type === 'Entity'
    })
    .map((fieldKey) => {
      return fields[fieldKey].typeEntityId
    })
  }
)

export default createSelector(
  getItemsSelector,
  getFieldsSelector,
  getEntitiesRelated,
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
