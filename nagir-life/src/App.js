import React, {Component} from 'react';
import InputForm from './InputForm';

class App extends Component {
  state = {
    peak: 0,
    retire: 0,
  }

  calcLifeTime = () => {

  }

  setStateValue = (name, value) => {
    if(name === "peak" && value === "x"){
      //ピーク告知なし
      this.setState({
        peak: "x"
      })
      return ;
    }

    let num = parseInt(value)
    if( !Number.isInteger(num) && (num < 0 || num > 48) ){
      console.log("Error")
      return ;
    }

    if(name === "peak"){
      this.setState({
        peak: num
      })
    }else if(name ==="retire"){
      this.setState({
        retire: num
      })
    }else{
      console.log("Error")
    }
    
    return ;
  }

  render() {
    return (
      <div className="container">
        <div className="inline-block">
          ナギール数</div>
        <div className="inline-block">
          <InputForm name="peak" change={this.setStateValue} /></div>
        <div className="inline-block">
          <InputForm name="retire" change={this.setStateValue} /></div>

        <h1 align="center">⬇</h1>

        
      </div>
    );
  }
}

export default App;