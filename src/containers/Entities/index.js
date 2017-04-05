import React, { Component } from "react"
import { connect } from "react-redux"
import { listenRef, stopListenRef } from "utils/firebase"

import { Button } from 'react-toolbox/lib/button'
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card';

import mapStateToProps from "./selectors"
import mapDispatchToProps from "./actions"

import styles from "./index.css"

class Entities extends Component {

  constructor(props){
    super(props)
    this.projectId = this.props.match.params.projectId
    this.props.setProjectId(this.projectId)
  }

  componentDidMount() {
    listenRef("entities/data", this.props.getEntities, "projectId", this.projectId)
  }

  componentWillUnmount() {
    stopListenRef("entities/data")
  }

  getEntities(entities) {
    return Object.keys(entities).map((entityKey) => {
      return (
        <Card key={entityKey} className={styles.entity}>
          <CardTitle
            title={entities[entityKey].name}
          />
          <CardActions>
            <Button
              icon="delete"
              label="Delete"
              raised
              onClick={ this.props.removeEntity.bind(this, entityKey) }
            />
            <Button
              icon="edit"
              label="Edit"
              raised
              onClick={ this.props.navigateToRelative.bind(this, `${entityKey}/edit`) }
            />
            <Button
              icon="arrow_forward"
              label="See items !"
              raised
              onClick={ this.props.navigateToRelative.bind(this, `${entityKey}/items`) }
            />
          </CardActions>
        </Card>
      )
    })
  }

  render(){
    return(
      <div className={styles.entities}>
        <h1>All entities</h1>
        <Button
          className={ styles.addButton}
          raised
          icon='add'
          label="Add an entity"
          onClick={this.props.addEntity.bind(this, this.projectId)}
        />
      <div className={styles["entities-container"]}>
          { this.getEntities(this.props.entities) }
        </div>
        <Button
          className={ styles.addButton}
          raised
          icon='add'
          label="Add an entity"
          onClick={this.props.addEntity.bind(this, this.projectId)}
        />
      </div>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Entities)
