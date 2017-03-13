import React, { Component } from "react"
import { Redirect, Route } from "react-router-dom"

import styles from "./index.css"

export default class ProtectedRoute extends Component {

  render() {
    return (
      <Route path="/" render={() => {
        if (this.props.isAuthenticated) {
          return (
            <div className={styles.main}>
              { this.props.children }
            </div>
          )
        }
        return (
          <Route path="/:notEmpty" render={({match}) => {
            return (
              match.params.notEmpty === "login"? null : <Redirect to="/"/>
            )
          }}/>
        )
      }}/>
    )
  }
}
