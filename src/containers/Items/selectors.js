import { createSelector } from "reselect"

import {
  getItemsSelector,
  getFieldsSelector,
  getFilterSelector,
  getCurrentEntityId,
  getItemsRelatedSelector,
  getFieldsRelatedSelector,
  getEntitiesRelatedSelector,
} from "selectors"

const isItemMatch = (item, filter) => {
   return Object.keys(item).find((fieldKey) => {
    return Object.keys(item[fieldKey]).find((entryKey) => {
      return item[fieldKey][entryKey].includes(filter)
    })
  })
}

const getItemsFiltered = createSelector(
  getItemsSelector,
  getFilterSelector,
  getCurrentEntityId,
  (items, filter, entityId) => {
    if (entityId !== filter.entityId)
      return items
    return Object.keys(items).filter((itemKey) => {
      return isItemMatch(items[itemKey], filter.filter)
    }).reduce((acc, itemKey) => {
      acc[itemKey] = items[itemKey]
      return acc
    }, {})
  }
)

export default createSelector(
  getItemsFiltered,
  getFieldsSelector,
  getFilterSelector,
  getCurrentEntityId,
  getItemsRelatedSelector,
  getFieldsRelatedSelector,
  getEntitiesRelatedSelector,
  (items, fields, filter, entityId, itemsRelated, fieldsRelated, entitiesRelated ) => {
    return {
      items,
      fields,
      filter,
      entityId,
      itemsRelated,
      fieldsRelated,
      entitiesRelated,
    }
  }
)
