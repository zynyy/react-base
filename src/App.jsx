import React, { Component } from 'react';
import { Button, DatePicker } from 'antd';
import moment from 'moment';

import logo from './logo.svg';
import './App.css';

const dateFormat = 'YYYY/MM/DD';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '新增',
    };
  }

  render() {
    const { data } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" onAbort={this.demo} />
          <p>
            Edit
            <code>src/App.js</code>
            and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
            {data}
          </a>

          <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />

          <Button type="primary">{data}</Button>
        </header>
      </div>
    );
  }
}

export default App;
