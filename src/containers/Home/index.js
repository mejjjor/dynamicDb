import React, { Component } from "react"
import { connect } from "react-redux"

import { Button } from 'react-toolbox/lib/button'

import mapStateToProps from "./actions"
import mapDispatchToProps from "./selectors"


class Home extends Component {

  render() {
    return (
      <div>
        <Button
          icon="chevron_right"
          label="Projects"
          onClick={this.props.navigateTo.bind(this, "projects")}
        />
      </div>
    )
  }
}

export default connect(mapDispatchToProps, mapStateToProps)(Home)
