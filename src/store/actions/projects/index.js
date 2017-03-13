import firebase from "firebase"
import { createRef, _removeProject } from "utils/firebase"

export const ADD_PROJECT = "ADD_PROJECT"
export const addProject = () => {

  createRef('projects/data', {name: "new project"})

  return {
    type: ADD_PROJECT,
  }
}


export const GET_PROJECTS = "GET_PROJECTS"
export const getProjects = (projects) => {
  return {
    type: GET_PROJECTS,
    payload: {
      projects
    }
  }
}


export const SET_PROJECT_CHILD = "SET_PROJECT_CHILD"
export const setProjectChild = (projectId, child, value)=> {
  let newChild = {}
  newChild[child] = value
  firebase.database().ref()
  .child(`projects/data/${projectId}`)
  .update(newChild)

  return {
    type: SET_PROJECT_CHILD,
    payload: {
      projectId,
      child,
      value,
    }
  }
}


export const REMOVE_PROJECT = "REMOVE_PROJECT"
export const removeProject = (projectId)=> {
  _removeProject(projectId)

  return {
    type: REMOVE_PROJECT,
    payload: {
      projectId
    }
  }
}
