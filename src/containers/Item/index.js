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

  getFields(fields, items) {
    return Object.keys(fields)
      .filter(fieldKey => items[this.itemId][fieldKey] )
      .map((fieldKey) => {
      return Object.keys(items[this.itemId][fieldKey]).map((entry) => {
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
            return (
              <Autocomplete
                key={entry}
                multiple={false}
                label={fields[fieldKey].name}
                source={Object.keys(this.props.items)
                .filter(itemKey => this.props.items[itemKey].entityId === fields[fieldKey].typeEntityId)
                .reduce((acc, itemKey) => {
                  const label = Object.keys(this.props.items[itemKey]).reduce((acc, fieldKey)=>{
                    if (fields[fieldKey] && fields[fieldKey].master)
                      return Object.keys(this.props.items[itemKey][fieldKey]).reduce((acc, entryKey) => {
                        return acc || this.props.items[itemKey][fieldKey][entryKey]
                      }, false)
                    return acc
                  },"")
                  acc[itemKey] = label
                  return acc
                }, {"":"nothing"})}
                value={items[this.itemId][fieldKey][entry]}
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
              <Button
                icon="delete"
                label="Delete value"
                raised
                onClick={this.props.removeItemEntry.bind(this, this.itemId, fieldKey, entry.key)}
              />
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
          { this.getFields(this.props.fields, this.props.items) }
        </div>
      </div>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Item)
