import React from "react"
import firebase from "firebase"
import { Button } from 'react-toolbox/lib/button'

const Logout = ({ history }) => {

    const logout = () => {
      firebase.auth().signOut().then(function() {
        history.push('/')
      }, function(error) {
        // An error happened.
      });
    }
    return (
      <Button icon='exit_to_app' label='Logout' raised onClick={logout} />
    )
}

export default Logout
