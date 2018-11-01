import React, {Component} from 'react'
import ReactDOM from "react-dom";

export default class App extends Component {
  render() {
    return <h1>Everything works!!!! Hooray! :(</h1>
  }
}

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;
