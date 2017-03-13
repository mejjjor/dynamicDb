import React, { Component } from "react"
import firebase from "firebase"
import firebaseui from "firebaseui"


export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state={
      authUi:null
    }
  }

  componentDidMount() {
    const authUi = new firebaseui.auth.AuthUI(firebase.auth())
    this.setState({ authUi })
    var uiConfig = {
      signInSuccessUrl: "/",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
    }
    authUi.start('#firebaseui-auth', uiConfig);
  }

  render() {
    return (
      <div id="firebaseui-auth"/>
    )
  }
}
