import { createSelector } from "reselect"

export const isAuthenticatedSelector = store => store.firebase.isAuthenticated

export const getTitle = store => store.appInfos.title

export const getPathSelector = store => store.router.path

export const getProjectsSelector = store => store.projects.projects

export const getEntitiesSelector = store => store.entities.entities

export const getFieldsSelector = store => store.fields.fields

export const getFieldsRelatedSelector = store => store.fields.fieldsRelated

export const getItemsSelector = store => store.items.items

export const getItemsRelatedSelector = store => store.items.itemsRelated

export const getCurrentProjectId = store => store.router.projectId

export const getCurrentEntityId = store => store.router.entityId

export const getCurrentItemId = store => store.router.itemId

export const getFilterSelector = store => store.filters

export const getEntitiesRelatedSelector = createSelector(
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
