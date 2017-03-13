export const isAuthenticatedSelector = store => store.firebase.isAuthenticated

export const getTitle = store => store.appInfos.title

export const getPathSelector = store => store.router.path

export const getProjectsSelector = store => store.projects.projects

export const getEntitiesSelector = store => store.entities.entities

export const getFieldsSelector = store => store.fields.fields

export const getItemsSelector = store => store.items.items

export const getCurrentProjectId = store => store.router.projectId

export const getCurrentEntityId = store => store.router.entityId

export const getCurrentItemId = store => store.router.itemId

export const getFilterSelector = store => store.filters
