import React, { Component } from 'react';
import logo from './logo.svg';
import styles from './App.css';
import { Button } from 'react-toolbox/lib/button'

class App extends Component {
  render() {
    return (
      <div className={styles["App"]}>
        <div className={styles["App-header"]}>
          <img src={logo} className={styles["App-logo"]} alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className={styles["App-intro"]}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Button label="Hello World!" />

        <div className={styles["App-content"]}>
          TODO :
          <ul>
            <li>To install :</li>
              <ul>
                <li>Firebase</li>
                <li>Normalizr ?</li>
                <li><strike>React-tooltip</strike></li>
                <li><strike>Saga</strike></li>
                <li><strike>Reselect</strike></li>
                <li><strike>Router</strike></li>
                <li><strike>Redux</strike></li>
                <li><strike>Redux-logger</strike></li>
                <li><strike>Dot-props-immutable</strike></li>
              </ul>
            <li>Save boilerplate version</li>
            <li>Landing page</li>
              <ul>
                <li>Login with firebase</li>
                <li>Logout</li>
                <li>Add profil button in top-right</li>
              </ul>
            <li>Create project</li>
            <li>Create/Edit entity</li>
            <li>Create/edit item</li>
            <li>Limit read or write for no-authorized user</li>
            <li>Firebase db rules</li>
            <li>Add interface to manage these rules for super user</li>
          </ul>
          <ul>
            <li>Write to db on submit form</li>
            <li>Update from db on :</li>
              <ul>
                <li>Once on submit form</li>
                <li>Listen when on entity search page</li>
              </ul>
            <li>Extra</li>
              <ul>
                <li>?</li>
              </ul>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
