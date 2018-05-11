import React, { Component } from 'react';
import Layout from './components/Layout';
import './styles.css';

class App extends Component {

  render() {
    return (
      <div className="container">
        <Layout title="Chat"
                url='http://localhost:3231/messages'
                pollInterval={2000}/>
      </div>
    );
  }
}

export default App;
