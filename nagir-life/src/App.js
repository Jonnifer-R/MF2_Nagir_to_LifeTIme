import React, {Component} from 'react';
import InputForm from './InputForm';
import Output from './Output';

class App extends Component {
  state = {
    peak: 0,
    retire: 0,
  }

  setStateValue = (name, value) => {
    if(name === "peak" && value.includes("x")){
      //ピーク告知なし
      switch(value){
        case "x4":
          this.setState({peak: "x4"})
          break;
        case "x5":
          this.setState({peak: "x5"})
          break;
        case "x6":
          this.setState({peak: "x6"})
          break;
        default:
          console.log("Error: Bad x peak")
      }
      return ;
    }

    let num = parseInt(value)
    if( !Number.isInteger(num) && (num < 0 || num > 48) ){
      console.log("Error: Bad nagir number")
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
      console.log("Error: Bad label name")
    }
    
    return ;
  }

  render() {
    return (
      <div className="container">

        <div className="inline-block">
          ナギール数
        </div>
        <div className="inline-block">
          <InputForm name="peak" change={this.setStateValue} />
        </div>
        <div className="inline-block">
          <InputForm name="retire" change={this.setStateValue} />
        </div>

        <h1 align="center">⬇</h1>

        <div>
          <Output peak={this.state.peak} retire={this.state.retire} />
        </div>

      </div>
    )
  }
}

export default App;