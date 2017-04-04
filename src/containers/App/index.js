import React, { Component } from "react"
import {
  BrowserRouter,
  Route,
  Switch,
 } from "react-router-dom"

import mapStateToProps from "./selectors"

import { connect } from "react-redux"

import ProtectedRoute from "components/ProtectedRoute"
import Login from "containers/Login"
import SideBar from "containers/SideBar"
import TopBar from "containers/TopBar"
import Projects from "containers/Projects"
import ReduxRouter from "containers/ReduxRouter"
import Entities from "containers/Entities"
import Entity from "containers/Entity"
import Items from "containers/Items"
import Item from "containers/Item"
import Home from "containers/Home"


class App extends Component {

  render(){
    return (
      <BrowserRouter>
        <div>
          <Route path="/" component={ReduxRouter}/>
          <Route path="/" component={TopBar}/>
          <ProtectedRoute
            isAuthenticated={ this.props.isAuthenticated }
          >
            <Route path="/projects/:projectId" component={SideBar} />
            <Switch>
              <Route exact path="/projects/" component={Projects} />

              <Route exact path="/projects/:projectId/entities/" component={Entities} />

              <Route exact path="/projects/:projectId/entities/:entityId/edit" component={Entity} />

              <Route exact path="/projects/:projectId/entities/:entityId/items" component={Items} />

              <Route exact path="/projects/:projectId/entities/:entityId/items/:itemId" component={Item} />

              <Route path="/(login)?:notEmpty" render={() => {
                return (
                  <div>
                  PERDU! Cest la 404 poto!
                  </div>
                )
              }}/>
            </Switch>
          </ProtectedRoute>
          <Switch>
            <Route exact path="/login" component={ Login } />

            <Route exact path="/" component={ Home } />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default connect(mapStateToProps)(App)