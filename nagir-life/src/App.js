import React, {Component} from 'react';
import InputForm from './InputForm';
import Output from './Output';
import Usage from './Usage';

class App extends Component {
  state = {
    peak: 0,
    retire: 0,
    peakAnd1: 0,
    peakAnd2: 0,
  }

  setStateValue = (name, value) => {
    if(name === "peakAnd1" || name === "peakAnd2"){
      if(parseInt(value) === 0){
        this.setState({
          [name]: 0
        })

        return ;
      }
      if(value === "phase5" || value === "peak" || value === "postPeak" ){
        this.setState({
          [name]: value
        })

        return ;
      }else{
        console.log("Error: Bad peakAndNum value")

        return ;
      }
    }

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

    if(name === "peak" || name === "retire"){
      this.setState({
        [name]: num
      })
    }else{
      console.log("Error: Bad label name")
    }
    
    return ;
  }

  render() {
    return (
      <div className="container">
        <h1>ナギール数 to 寿命タイプ</h1>

        <div className="inline-block">
          ナギール数
        </div>
        <div className="inline-block">
          <InputForm name="peak" change={this.setStateValue} />
        </div>
        <div className="inline-block">
          <InputForm name="retire" change={this.setStateValue} />
        </div>

        <p />

        <div className="inline-block">
          ピーク告知後
        </div>
        <div className="inline-block">
          <InputForm name="peakAnd1" change={this.setStateValue} />
        </div>
        <div className="inline-block">
          <InputForm name="peakAnd2" change={this.setStateValue} />
        </div>

        <h1 align="center">⬇</h1>
        
        <Output peak={this.state.peak} retire={this.state.retire} 
          peakAnd1={this.state.peakAnd1} peakAnd2={this.state.peakAnd2} />

        <Usage />
      </div>
    )
  }
}

export default App;