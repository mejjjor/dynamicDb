import React, { Component } from "react"
import { connect } from "react-redux"
import { listenRef, stopListenRef } from "utils/firebase"

import Input from 'react-toolbox/lib/input'
import DatePicker from 'react-toolbox/lib/date_picker'
import TimePicker from 'react-toolbox/lib/time_picker'
import Autocomplete from 'react-toolbox/lib/autocomplete'
import { Card, CardText, CardActions } from 'react-toolbox/lib/card';

import { Button } from 'react-toolbox/lib/button'

import mapStateToProps from "./selectors"
import mapDispatchToProps from "./actions"

import styles from "./index.css"

class Item extends Component {

  constructor(props){
    super(props)
    this.projectId = this.props.match.params.projectId
    this.entityId = this.props.match.params.entityId
    this.itemId = this.props.match.params.itemId

    this.props.setProjectId(this.projectId)
    this.props.setEntityId(this.entityId)
    this.props.setItemId(this.itemId)

  }

  componentDidMount() {
    listenRef("items/data", this.props.getItems, "entityId", this.entityId)
    listenRef("fields/data", this.props.getFields, "entityId", this.entityId)

  }

  componentWillUnmount() {
    stopListenRef("items/data")
    stopListenRef("fields/data")
  }

  componentWillReceiveProps(newProps) {
    if (this.props.entitiesRelated !== newProps.entitiesRelated) {
      newProps.entitiesRelated.forEach((entityId) => {
        listenRef("items/data", this.props.getItemsRelated, "entityId", entityId)
        listenRef("fields/data", this.props.getFieldsRelated, "entityId", entityId)
      })
    }
  }

  getFields(fields, items, fieldsRelated) {
    return Object.keys(fields)
      .filter(fieldKey => items[this.itemId][fieldKey] )
      .map((fieldKey) => {
      return Object.keys(items[this.itemId][fieldKey])
      .map((entry) => {
        switch (fields[fieldKey].type) {

          case "Text":
            return (
              <Input
                type="text"
                key={entry}
                multiline={fields[fieldKey].multiline}
                label={fields[fieldKey].name}
                value={items[this.itemId][fieldKey][entry]}
                onChange={this.props.setItemChild.bind(this, this.itemId, fieldKey, entry)}
              />
            )
          case "Date":
            return (
              <DatePicker
                key={entry}
                label={fields[fieldKey].name}
                value={items[this.itemId][fieldKey][entry]?new Date(items[this.itemId][fieldKey][entry]):""}
                onChange={this.props.setItemChild.bind(this, this.itemId, fieldKey, entry)}
              />
            )
          case "Time":
            return (
              <TimePicker
                key={entry}
                label={fields[fieldKey].name}
                value={items[this.itemId][fieldKey][entry]?new Date(items[this.itemId][fieldKey][entry]):new Date("0")}
                onChange={this.props.setItemChild.bind(this, this.itemId, fieldKey, entry)}
              />
            )
          case "Entity":
            this.entityRelated = fields[fieldKey].typeEntityId
            this.fieldMaster = Object.keys(fieldsRelated).find(fieldKey => fieldsRelated[fieldKey].master)

            let currentValue = ""
            if (this.fieldMaster && items[this.itemId][fieldKey][entry] !== ""){
              Object.keys(this.props.itemsRelated)
              .filter(itemKey => this.props.itemsRelated[itemKey].entityId === this.entityRelated)
              .find((itemKey) => {
                if (itemKey === items[this.itemId][fieldKey][entry]) {
                  const firstEntryKey = Object.keys(this.props.itemsRelated[itemKey][this.fieldMaster]).find(()=>true)
                  currentValue = this.props.itemsRelated[itemKey][this.fieldMaster][firstEntryKey]
                  return true
                }
                return false
              })
            }
            return (
              <Autocomplete
                key={entry}
                direction="down"
                suggestionMatch="anywhere"
                multiple={false}
                label={fields[fieldKey].name}
                source={Object.keys(this.props.itemsRelated)
                  .filter(itemKey => this.props.itemsRelated[itemKey].entityId === this.entityRelated)
                  .reduce((acc, itemKey) => {
                    if (this.props.itemsRelated[itemKey][this.fieldMaster] && this.fieldMaster) {
                      const firstEntryKey = Object.keys(this.props.itemsRelated[itemKey][this.fieldMaster]).find(()=>true)
                      acc[itemKey] = this.props.itemsRelated[itemKey][this.fieldMaster][firstEntryKey]
                    }
                    return acc
                  }, {"":"nothing"})}
                value={currentValue}
                onChange={this.props.setItemChild.bind(this, this.itemId, fieldKey, entry)}
              />
            )

          default:
            return null
        }
      }).map((entry, index) => {
        return (
          <CardText key={`${fieldKey}++uglyHack${index}`} className={styles.entry}>
            <div className={styles.entryContent}>
              { entry }
            </div>
              {index === 0? null
                :
                <Button
                icon="delete"
                label="Delete value"
                raised
                onClick={this.props.removeItemEntry.bind(this, this.itemId, fieldKey, entry.key)}
              />}
          </CardText>
        )
      })
    }).map((field, index) => {
      const fieldId = /^.*\+\+uglyHack/.exec(field[0].key)[0].slice(0, -10)
      return (
        <Card key={`field_${index}`} className={styles.field}>
          {field}
          <CardActions>
            <Button
              icon="add"
              label="Add value"
              raised
              onClick={this.props.addItemChild.bind(this, this.itemId, fieldId)}
            />
          </CardActions>
        </Card>
      )
    })
  }

  render(){
    return(
      <div className={styles.item}>
        <div>
          { this.getFields(this.props.fields, this.props.items, this.props.fieldsRelated) }
        </div>
      </div>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Item)
