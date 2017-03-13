import React, { Component } from "react"
import { connect } from "react-redux"
import { listenRef, stopListenRef } from "utils/firebase"

import Dropdown from 'react-toolbox/lib/dropdown'
import { Button } from 'react-toolbox/lib/button'
import { Card, CardActions } from 'react-toolbox/lib/card';

import Input from 'react-toolbox/lib/input'
import Checkbox from 'react-toolbox/lib/checkbox'

import mapStateToProps from "./selectors"
import mapDispatchToProps from "./actions"

import styles from "./index.css"

class Entity extends Component {

  constructor(props){
    super(props)
    this.projectId = this.props.match.params.projectId
    this.entityId = this.props.match.params.entityId
    this.props.setProjectId(this.projectId)
    this.props.setEntityId(this.entityId)
    this.types = [
      {value:"Text", label:"Text"},
      {value:"Date", label:"Date"},
      {value:"Time", label:"Time"},
      {value:"Entity", label:"Entity"}
    ]
  }

  componentDidMount() {
    listenRef("fields/data", this.props.getFields, "entityId", this.entityId)
    listenRef("entities/data", this.props.getEntities, "projectId", this.projectId)
  }

  componentWillUnmount() {
    stopListenRef("fields/data")
    stopListenRef("entities/data")
  }

  getFields(fields) {
    return Object.keys(fields).map((fieldKey) => {
      return (
        <Card key={fieldKey} className={styles.field}>
          <Input
            type='text'
            label="Name"
            value={this.props.fields[fieldKey].name}
            onChange={this.props.setFieldChild.bind(this, fieldKey, "name")}
          />
          <Dropdown
            label="Type"
            source={this.types}
            value={this.props.fields[fieldKey].type}
            onChange={this.props.setFieldChild.bind(this, fieldKey, "type")}
          />
          { this.props.fields[fieldKey].type === "Entity" &&
            <Dropdown
              label="Entity"
              source={Object.keys(this.props.entities).map(entityKey => {
                return {
                  value: entityKey,
                  label: this.props.entities[entityKey].name
                }
              })}
              value={this.props.fields[fieldKey].typeEntityId}
              onChange={this.props.setFieldChild.bind(this, fieldKey, "typeEntityId")}
            />
          }
          { this.props.fields[fieldKey].type === "Text" &&
            <Checkbox
             checked={this.props.fields[fieldKey].multiline}
             label="Multiline"
             onChange={this.props.setFieldChild.bind(this, fieldKey, "multiline")}
            />
          }
         <Checkbox
          checked={this.props.fields[fieldKey].integrated}
          label="Integrated"
          onChange={this.props.setFieldChild.bind(this, fieldKey, "integrated")}
         />
         { this.props.fields[fieldKey].type !== "Entity" &&
            <Checkbox
             checked={this.props.fields[fieldKey].master}
             label="Master"
             onChange={this.props.setFieldChild.bind(this, fieldKey, "master")}
             />
          }
        <CardActions>
          <Button raised icon="delete" label="Delete" onClick={this.props.removeField.bind(this, fieldKey, this.entityId)}  />
        </CardActions>

        </Card>
      )
    })
  }


  render(){
    if (!this.props.entities[this.entityId])
      return null

    return(
      <div className={ styles.entity }>
        <Input
          type='text'
          label='Name'
          value={this.props.entities[this.entityId].name}
          onChange={this.props.setEntityChild.bind(this, this.entityId, "name")}
        />

      <div className={styles.fields}>
          { this.getFields(this.props.fields) }
        </div>
        <Button
          raised
          icon='add'
          label="Add a field"
          onClick={this.props.addField.bind(this, this.projectId, this.entityId)}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Entity)
