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

const calcPeak = (nagir) => {
  let range = {
    a: {bottomRange: 0, topRange: 0},
    b: {bottomRange: 0, topRange: 0},
    c: {bottomRange: 0, topRange: 0},
    d: {bottomRange: 0, topRange: 0},
  }

  if(isNaN(nagir)){
    if(nagir==="x4"){
      range.a.bottomRange = 211
      range.a.topRange = 240
    }else if(nagir==="x5"){
      range.a.bottomRange = 281
      range.a.topRange = 300
    }else if(nagir==="x6"){
      range.a.bottomRange = 351
      range.a.topRange = 360
    }else{
      console.log("Error: Bad nagir num")
      return ;
    }
    range.b = calcPeakEachType("持続",0)
    range.c = calcPeakEachType("普通",0)
    range.d = calcPeakEachType("晩成",0)

  }else{
    range.a = calcPeakEachType("早熟",nagir)
    range.b = calcPeakEachType("持続",nagir)
    range.c = calcPeakEachType("普通",nagir)
    range.d = calcPeakEachType("晩成",nagir)
  }

  return range
}

const calcPeakEachType = (type,nagir) => {
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
    topRange = rangeFromPeak.topRange < rangeFromRetire.topRange ?
      rangeFromPeak.topRange : rangeFromRetire.topRange

    if(bottomRange > topRange || rangeFromPeak.topRange < rangeFromRetire.bottomRange){
      //該当なし
      return (0, 0)
    }

  }else if(rangeFromPeak && (rangeFromRetire===0)){
    bottomRange = rangeFromPeak.bottomRange
    topRange = rangeFromPeak.topRange
  }else if( (rangeFromPeak===0) && rangeFromRetire){
    bottomRange = rangeFromRetire.bottomRange
    topRange = rangeFromRetire.topRange
  }else{
    bottomRange = 0
    topRange = 0
  }

  return {bottomRange, topRange}
}

const TableList = (props) => {
  const name = props.name
  const type = props.type !== 0 ?  props.type : {bottomRange: 0, topRange: 0}

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
    a: calcRange(props.peak.a, props.retire),
    b: calcRange(props.peak.b, props.retire),
    c: calcRange(props.peak.c, props.retire),
    d: calcRange(props.peak.d, props.retire),
  }

  return(
    <div className="result"> 
      <table>
        <thead>
          <tr>
            <td> </td>
            <td colSpan="3">寿命範囲</td>
          </tr>
        </thead>
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

    const peak = calcPeak(peakNagir)
    const retire = calcRetire(retireNagir)

    return (
      <EstimateLife peak={peak} retire={retire} />
    )
  }
}


export default Output;