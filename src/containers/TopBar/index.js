import React, { Component } from "react"
import { connect } from "react-redux"

import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import { Button } from 'react-toolbox/lib/button'

import Logout from "containers/Logout"

import mapStateToProps from "./selectors"
import mapDispatchToProps from "./actions"

import styles from "./index.css"

class TopBar extends Component {

  render(){
    return (
      <AppBar title={`DbDynamic - ${this.props.title}`} className={styles.topBar}>
        <Navigation type="horizontal">
          { this.props.isAuthenticated? <Logout/> : (
            <Button
              raised
              icon="chevron_right"
              label="Login"
              onClick={this.props.navigateTo.bind(this, "/login")}
            />
            )
          }
        </Navigation>
      </AppBar>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)
