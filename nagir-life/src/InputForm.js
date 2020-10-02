import React, {Component} from "react";

const ColtsMessage = (props) => {
  const name = props.name
  if(name === "peak"){
    return "ピーク告知"
  }else if(name === "retire"){
    return "引退勧告1"
  }else{
    return "未定義"
  }
}

const NagirMenu = (props) => {
  const name = props.name

  const noneSelect = <option value='0' key='0'>―選択―</option>
  const peakLess = <option value='x' key='x'>告知なし</option>
  
  const maxNagirNum = 48
  const sequentiaNumMenu = new Array(maxNagirNum)
    .fill(null)
    .map((_, i) => i+1);
  let nagirMenu = sequentiaNumMenu.map((value) =>
    <option value={value} key={value}>{value}</option>
  )

  if(name === 'peak'){
    nagirMenu.unshift(peakLess)
  }
  nagirMenu.unshift(noneSelect)

  return nagirMenu
}

class InputForm extends Component {
  state = {
    name: this.props.name,
    value: 0,
  }

  // handleChange = (event) => {
  //   const {value} = event.target
  //   const {name} = event.target.name
  
  //   this.setState({
  //     [name]: value,
  //   })
  // }

  render(){
    const {name} = this.state;

    return(
      <form>
        <label htmlFor={name}>
          <ColtsMessage name={name} />
        </label>
        <select id={name}>
          <NagirMenu name={name} />
        </select>
      </form>
    )
  }
}

export default InputForm;