import React, { Component } from "react"
import { connect } from "react-redux"
import { listenRef, stopListenRef } from "utils/firebase"

import { Button } from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card'

import mapStateToProps from "./selectors"
import mapDispatchToProps from "./actions"

import styles from "./index.css"

import { saveAll } from "utils/firebase"
import { load } from "utils/firebase"


class Projects extends Component {

  componentDidMount() {
    listenRef("projects/data", this.props.getProjects)
  }

  componentWillUnmount() {
    stopListenRef("projects/data")
  }

  getProjects(projects) {
    return Object.keys(projects).map((projectKey) => {
      return (
        <Card key={projectKey} className={styles.project}>
          <CardTitle>
            <Input
              type="text"
              key={projectKey}
              value={projects[projectKey].name}
              onChange={this.props.setProjectChild.bind(this, projectKey, "name")}
            />
          </CardTitle>
          <CardActions>
            <Button raised icon="delete" label="Delete" onClick={this.props.removeProject.bind(this, projectKey)}  />
            <Button icon="chevron_right" label="See it!" raised onClick={this.props.navigateToRelative.bind(this, `${projectKey}/entities`)} />
          </CardActions>
        </Card>
      )
    })
  }

  makeTextFile() {
    saveAll((text) => {
      const str = JSON.stringify(text)
      var data = new Blob([str], {type: 'text/plain'});
      const textFile = window.URL.createObjectURL(data);
      window.open(textFile)
    })
  }

  load() {
    load()
  }


  render(){
    return(
      <div className={styles.projects}>
        <h1>All projects</h1>
        <Button className={styles["add-button"]} icon='add' label="Add a project" onClick={this.props.addProject} />
        <div className={styles["project-container"]}>
          { this.getProjects(this.props.projects) }
        </div>
        <Button className={styles["add-button"]} icon='add' label="Add a project" onClick={this.props.addProject} />
        <Button className={styles["add-button"]} icon='save' label="Save all" onClick={this.makeTextFile} />
        {/*<Button className={styles["add-button"]} icon='file_upload' label="Upload" onClick={this.load} />*/}
      </div>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)
