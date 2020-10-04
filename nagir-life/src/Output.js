import React, {Component} from 'react';

const getPeakFromType = (type) => {
  switch(type){
    case "早熟":
      return 0.3;
    case "持続":
      return 0.3;
    case "普通":
      return 0.5;
    case "晩成":
      return 0.6;
    default:
      console.log("Error: Not exist type")
      return false
  }
}

const getPostPeakFromType = (type) => {
  switch(type){
    case "早熟":
      return 0.35;
    case "持続":
      return 0.4;
    case "普通":
      return 0.6;
    case "晩成":
      return 0.7;
    default:
      console.log("Error: Not exist type")
      return false
  }
}

const calcPeak = (type,nagir) => {
  if(nagir===0){
    return 0;
  }

  const startPostPeak = parseInt(
    ( nagir*21 / getPostPeakFromType(type) )+1
  )
  const preEndPeak = parseInt(
    ( (nagir-1)*21 / getPeakFromType(type) )+1
  )

  const bottomRange = startPostPeak > preEndPeak ? startPostPeak : preEndPeak
  const topRange = parseInt( nagir*21 / getPeakFromType(type) )

  return {bottomRange, topRange}
}

const calcRetire = (nagir) => {
  if(nagir===0){
    return 0;
  }

  const bottomRange = nagir*21+1
  const topRange = nagir*21+49

  return {bottomRange, topRange}
}

const calcRange = (rangeFromPeak,rangeFromRetire) =>{
  let bottomRange, topRange
  if(rangeFromPeak && rangeFromRetire){
    bottomRange = rangeFromPeak.bottomRange > rangeFromRetire.bottomRange ? 
      rangeFromPeak.bottomRange : rangeFromRetire.bottomRange
    topRange = rangeFromPeak.TopRange > rangeFromRetire.topRange ?
      rangeFromPeak.topRange : rangeFromRetire.topRange
  }else if(rangeFromPeak && (rangeFromRetire===0)){
    bottomRange = rangeFromPeak.bottomRange
    topRange = rangeFromPeak.topRange
  }else if( (rangeFromPeak===0) && rangeFromRetire){
    bottomRange = rangeFromRetire.bottomRange
    topRange = rangeFromRetire.topRange
  }else{
    bottomRange = "0"
    topRange = "0"
  }

  return {bottomRange, topRange}
}

const TableList = (props) => {
  const name = props.name
  const type = props.type

  console.log(type.bottomRange)
  return (
    <tr>
      <td>{name}</td>
      <td className="life">{type.bottomRange}</td>
      <td>-</td>
      <td className="life">{type.topRange}</td>
    </tr>
  )
}

const EstimateLife = (props) => {
  const type = {
    a: calcRange(props.type.a, props.retire),
    b: calcRange(props.type.b, props.retire),
    c: calcRange(props.type.c, props.retire),
    d: calcRange(props.type.d, props.retire),
  }

  return(
    <div className="result"> 
      <table>
        <tbody>
          <TableList name="早熟" type={type.a} />
          <TableList name="持続" type={type.b} />
          <TableList name="普通" type={type.c} />
          <TableList name="晩成" type={type.d} />
        </tbody>
      </table>
    </div>
  )
}

class Output extends Component {
  render() {
    const peakNagir = this.props.peak
    const retireNagir = this.props.retire

    const type = {
      a: calcPeak("早熟",peakNagir),
      b: calcPeak("持続",peakNagir),
      c: calcPeak("普通",peakNagir),
      d: calcPeak("晩成",peakNagir),
    }
    const retire = calcRetire(retireNagir)

    return (
      <EstimateLife type={type} retire={retire} />
    )
  }
}


export default Output;