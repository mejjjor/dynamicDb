import React, { Component } from "react"
import { connect } from "react-redux"
import { listenRef, stopListenRef } from "utils/firebase"

import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button'

import mapStateToProps from "./selectors"
import mapDispatchToProps from "./actions"

import styles from "./index.css"

class Items extends Component {

  constructor(props){
    super(props)
    this.entityId = this.props.match.params.entityId

    this.props.setProjectId(this.props.match.params.projectId)
    this.props.setEntityId(this.entityId)
  }

  componentDidMount() {
    listenRef("items/data", this.props.getItems, "entityId", this.entityId)
    listenRef("fields/data", this.props.getFields, "entityId", this.entityId)
  }

  componentWillUnmount() {
    stopListenRef("items/data")
    stopListenRef("fields/data")
  }

  getValues(itemKey, fieldKey, type) {
    return Object.keys(this.props.items[itemKey][fieldKey])
    .map((valueKey) => {
      switch (type) {
        case "Text":
          return (
            <CardText key={valueKey}>{this.props.items[itemKey][fieldKey][valueKey]}</CardText>
          )

        case "Date":
        case "Time":
          return (
            <CardText key={valueKey}>
              {Date(this.props.items[itemKey][fieldKey][valueKey])}
            </CardText>
          )

        case "Entity":
          return (
            <CardText key={valueKey}>
              {this.getMasterField(this.props.items[itemKey][fieldKey][valueKey])}
            </CardText>
          )
        default:
          return null
      }
    })
  }

  getMasterField(itemId) {
    if (this.props.items[itemId]){
      const masterFieldId = Object.keys(this.props.items[itemId]).find((fieldKey) => {
        return this.props.fields[fieldKey].master
      })
      return this.props.items[itemId][masterFieldId][Object.keys(this.props.items[itemId][masterFieldId]).find((je)=>true)]
    }
  }

  getFields(itemKey) {
    return Object.keys(this.props.items[itemKey])
    .filter(fieldKey => this.props.fields[fieldKey] && fieldKey !== "entityId")
    .map((fieldKey) => {
      return (
        <div key={fieldKey}>
          <CardTitle subtitle={this.props.fields[fieldKey].name} />
          { this.getValues(itemKey, fieldKey, this.props.fields[fieldKey].type) }
        </div>
      )
    })
  }

  getItems(items) {
    return Object.keys(items)
    .filter(itemKey => items[itemKey].entityId === this.entityId)
    .map((itemKey) => {
      return (
        <Card key={itemKey} className={styles.item}>
          { this.getFields(itemKey) }
          <CardActions>
            <Button
              icon="delete"
              raised
              label="Delete"
              onClick={ this.props.removeItem.bind(this, `${itemKey}`) }
            />
            <Button
              icon="edit"
              raised
              label="Edit"
              onClick={ this.props.navigateToRelative.bind(this, `${itemKey}`) }
            />
        </CardActions>
      </Card>
      )
    })
  }


  render(){
    return(
      <div className={ styles.items }>
        <Button
          className={styles.addButton}
          icon='add'
          label="Add an item"
          onClick={this.props.addItem.bind(this, this.entityId)}
        />
        <Input
          type='text'
          hint='Search'
          value={this.props.filter.filter}
          onChange={this.props.setFilter.bind(this, this.entityId)}
        />

        {this.getItems(this.props.items)}

        <Button
          className={styles.addButton}
          icon='add'
          label="Add an item"
          onClick={this.props.addItem.bind(this, this.entityId)}
        />
      </div>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Items)
