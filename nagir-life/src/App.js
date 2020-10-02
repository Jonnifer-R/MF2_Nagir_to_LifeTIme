import React, {Component} from 'react';
import Form from './Form';

class App extends Component {
  render() {
    return (
      <div className="container">     
        <Form name="peak" />
        <Form name="retire" />
      </div>
    );
  }
}

export default App;