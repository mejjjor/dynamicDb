import React, { Component } from "react"
import { connect } from "react-redux"
import { listenRef, stopListenRef } from "utils/firebase"

import Link from 'react-toolbox/lib/link'

import mapStateToProps from "./selectors"
import mapDispatchToProps from "./actions"

import styles from "./index.css"

class SideBar extends Component {

  componentDidMount() {
    this.projectId = this.props.match.params.projectId
    listenRef("projects/data", this.props.getProjects)
    listenRef("entities/data", this.props.getEntities, "projectId", this.projectId)
  }

  componentWillUnmount() {
    stopListenRef("projects/data")
    stopListenRef("entities/data")
  }

  getEntities(entities) {
    return Object.keys(entities).map((entityKey) => {
      return (
        <Link
          key={entityKey}
          onClick={this.props.navigateTo.bind(this, `/projects/${this.projectId}/entities/${entityKey}/items`)}
          label={entities[entityKey].name}
        />
      )
    })
  }

  render(){
    return (
      <div className={styles.sideBar}>
        <div>
        { this.props.projects[this.projectId] &&
          <Link
            onClick={this.props.navigateTo.bind(this, "/projects")}
            label={"All projects"}
          />
        }
        <div className={styles.separator}>{" "}</div>
        </div>
        <div>
        { this.props.projects[this.projectId] &&
          <Link
            onClick={this.props.navigateTo.bind(this, `/projects/${this.projectId}/entities`)}
            label={this.props.projects[this.projectId].name}
          />
        }
        <div className={styles.separator}>{" "}</div>
        { /* this.getEntities(this.props.entities)*/ }
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
