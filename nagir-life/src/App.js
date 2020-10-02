import React, {Component} from 'react';
import InputForm from './InputForm';

class App extends Component {
  render() {
    return (
      <div className="container">     
        <InputForm name="peak" />
        <InputForm name="retire" />
      </div>
    );
  }
}

export default App;