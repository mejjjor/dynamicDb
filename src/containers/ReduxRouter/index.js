import { Component } from "react"
import { connect } from "react-redux"
import mapDispatchToProps from "./actions"
import mapStateToProps from "./selectors"

class ReduxRouter extends Component {

  componentDidMount() {
    this.props.initRouter(this.props.history)
    this.props.setRouterPath(this.props.location.pathname)
  }


  componentDidUpdate() {
    if (!this.props.path.match("^"+this.props.location.pathname+"/?$"))
      this.props.setRouterPath(this.props.location.pathname)
  }

  render() {
    return (
      null
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxRouter)
