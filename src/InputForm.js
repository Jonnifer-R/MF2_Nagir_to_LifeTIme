import React, {Component} from "react";

const BoxTitle = (props) => {
  const name = props.name
  switch(name){
    case "peak":
      return "ピーク告知"
    case "retire":
      return "引退勧告1"
    case "peakAnd1":
      return "+1ナギール"
    case "peakAnd2":
      return "+2ナギール"
    default:
      return "未定義";
  }
}

const NagirMenu = (name) => {
  const noneSelect = <option value='0' key='0'>―選択―</option>
  const peakLess = [
    <option value='x4' key='x4'>無し 4</option>,
    <option value='x5' key='x5'>無し 5</option>,
    <option value='x6' key='x6'>無し 6</option>,
  ]
  
  const maxNagirNum = 48
  const sequentiaNumMenu = new Array(maxNagirNum)
    .fill(null)
    .map((_, i) => i+1);
  let nagirMenu = sequentiaNumMenu.map((value) =>
    <option value={value} key={value}>{value}</option>
  )

  if(name === 'peak'){
    nagirMenu.unshift(...peakLess)
  }
  nagirMenu.unshift(noneSelect)

  return nagirMenu
}

const BoxMenu = (props) => {
  const name = props.name

  if(name==="peak" || name==="retire"){
    return NagirMenu(name)
  }
  
  let menu = [<option value='0' key='0'>―選択―</option>]
  menu.push(<option value='phase5' key='phase5'>5段階</option>)
  menu.push(<option value='peak' key='peak'>ピーク</option>)
  menu.push(<option value='postPeak' key='postPeak'>準ピーク</option>)

  return menu
}

class InputForm extends Component {
  state = {
    name: this.props.name,
  }

  handleChange = (event) => {
    const name = this.state.name
    const value = event.target.value

    this.setState({
      [name]: value,
    })
    
    this.props.change(name,value)
  }

  render(){
    const {name} = this.state;

    return(
      <form>
        <label htmlFor={name}>
          <BoxTitle name={name} />
        </label>
        <select id={name} onChange={this.handleChange}>
          <BoxMenu name={name} />
        </select>
      </form>
    )
  }
}

export default InputForm;