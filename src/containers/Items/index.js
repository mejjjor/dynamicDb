import React, { Component } from "react"
import { connect } from "react-redux"
import { listenRef, stopListenRef } from "utils/firebase"

import { Card, CardActions } from 'react-toolbox/lib/card';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button'

import dateFns from "date-fns"

import mapStateToProps from "./selectors"
import mapDispatchToProps from "./actions"

import styles from "./index.css"

class Items extends Component {

  constructor(props){
    super(props)
    this.entityId = this.props.match.params.entityId
    this.projectId = this.props.match.params.projectId

    this.props.setProjectId(this.projectId)
    this.props.setEntityId(this.entityId)
  }

  componentDidMount() {
    listenRef("items/data", this.props.getItems, "entityId", this.entityId)
    listenRef("fields/data", this.props.getFields, "entityId", this.entityId)
    listenRef("entities/data", this.props.getEntities, "projectId", this.projectId)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.entitiesRelated !== newProps.entitiesRelated) {
      newProps.entitiesRelated.forEach((entityId) => {
        listenRef("items/data", this.props.getItemsRelated, "entityId", entityId)
        listenRef("fields/data", this.props.getFieldsRelated, "entityId", entityId)
      })
    }
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
            <div key={valueKey}>{this.props.items[itemKey][fieldKey][valueKey]}</div>
          )

        case "Date":
        case "Time":
          return (
            <div key={valueKey}>
              {dateFns.format( new Date(this.props.items[itemKey][fieldKey][valueKey]), 'MM/DD/YYYY')}
            </div>
          )

        case "Entity":
          this.entityRelated = this.props.fields[fieldKey].typeEntityId
          this.fieldMaster = Object.keys(this.props.fieldsRelated).find(fieldKey => this.props.fieldsRelated[fieldKey].master)

          let currentValue = ""
          if (this.fieldMaster && this.props.items[itemKey][fieldKey][valueKey] !== ""){
            Object.keys(this.props.itemsRelated)
            .filter(itemKey => this.props.itemsRelated[itemKey].entityId === this.entityRelated)
            .find((itemsRelatedKey) => {
              if (this.props.itemsRelated[itemsRelatedKey][this.fieldMaster] && this.fieldMaster && itemsRelatedKey === this.props.items[itemKey][fieldKey][valueKey]) {
                const firstEntryKey = Object.keys(this.props.itemsRelated[itemsRelatedKey][this.fieldMaster]).find(()=>true)
                currentValue = this.props.itemsRelated[itemsRelatedKey][this.fieldMaster][firstEntryKey]
                return true
              }
              return false
            })
          }
          return (
            <div key={valueKey}>
              {currentValue}
            </div>
          )
        default:
          return null
      }
    })
  }

  getMasterField(itemId) {
    console.log(itemId)
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
        <div className={styles.fields} key={fieldKey}>
          <div className={styles.field}>
          {this.props.fields[fieldKey].name} :
          </div>
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
        <h1>All items from entity "{this.props.entities[this.entityId]? this.props.entities[this.entityId].name : ""}"</h1>
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
