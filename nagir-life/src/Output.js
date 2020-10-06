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
    range.b = {bottomRange: -1, topRange: -1}
    range.c = {bottomRange: -1, topRange: -1}
    range.d = {bottomRange: -1, topRange: -1}

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
    return {bottomRange: 0, topRange: 0};
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
  let bottomRange, topRange

  if(nagir===0){
    bottomRange = 0
    topRange = 0

  }else{
    bottomRange = nagir*21+1
    topRange = nagir*21+49
  }

  return ({
    a: {bottomRange, topRange},
    b: {bottomRange, topRange},
    c: {bottomRange, topRange},
    d: {bottomRange, topRange},
  })
}

const calcPeakAfterPhase = (peak, peakAnd1, peakAnd2) => {
  const nagir1 = [
      {type: "早熟", bottomRange: 241, topRange: 262, phase: "phase5"},
      {type: "早熟", bottomRange: 263, topRange: 280, phase: "postPeak"},
      {type: "早熟", bottomRange: 281, topRange: 315, phase: "phase5"},
      {type: "早熟", bottomRange: 316, topRange: 350, phase: "postPeak"},
      {type: "早熟", bottomRange: 351, topRange: 367, phase: "phase5"},
      {type: "早熟", bottomRange: 368, topRange: 480, phase: "postPeak"},
      {type: "早熟", bottomRange: 481, topRange: 700, phase: "peak"},

      {type: "持続", bottomRange: 241, topRange: 262, phase: "postPeak"},
      {type: "持続", bottomRange: 263, topRange: 280, phase: "peak"},
      {type: "持続", bottomRange: 281, topRange: 315, phase: "postPeak"},
      {type: "持続", bottomRange: 316, topRange: 350, phase: "peak"},
      {type: "持続", bottomRange: 351, topRange: 367, phase: "postPeak"},
      {type: "持続", bottomRange: 368, topRange: 700, phase: "peak"},
  ]

  const nagir2 = [
      {type: "早熟", bottomRange: 421, topRange: 472, phase: "phase5"},
      {type: "早熟", bottomRange: 473, topRange: 490, phase: "postPeak"},
      {type: "早熟", bottomRange: 491, topRange: 525, phase: "phase5"},
      {type: "早熟", bottomRange: 526, topRange: 560, phase: "postPeak"},
      {type: "早熟", bottomRange: 561, topRange: 577, phase: "phase5"},
      {type: "早熟", bottomRange: 578, topRange: 700, phase: "postPeak"},

      {type: "持続", bottomRange: 421, topRange: 472, phase: "postPeak"},
      {type: "持続", bottomRange: 473, topRange: 490, phase: "peak"},
      {type: "持続", bottomRange: 491, topRange: 525, phase: "postPeak"},
      {type: "持続", bottomRange: 526, topRange: 560, phase: "peak"},
      {type: "持続", bottomRange: 561, topRange: 577, phase: "postPeak"},
      {type: "持続", bottomRange: 578, topRange: 700, phase: "peak"},
  ]

  let result = {
    nagir1: nagir1.filter(range => (
      range.bottomRange <= peak.a.topRange &&
      range.topRange >= peak.a.bottomRange &&
      range.phase === peakAnd1
    )),
    nagir2: nagir2.filter(range => (
      range.bottomRange <= peak.a.topRange &&
      range.topRange >= peak.a.bottomRange &&
      range.phase === peakAnd2
    )),
  }

  return result
}

const isExistRange = (range) => {
  if(range.bottomRange === -1 && range.topRange === -1){
    return false
  }else if(range.bottomRange === 0 && range.topRange === 0){
    return false
  }else{
    return true
  }
}

const isZeroRange = (range) => {
  if(range.bottomRange === 0 && range.topRange === 0){
    return true
  }else{
    return false
  }
}

const calcRange = (rangeA, rangeB) => {
  //共通範囲を得る
  let bottomRange, topRange

  if( isExistRange(rangeA) && isExistRange(rangeB)){
    if(rangeA.bottomRange > rangeB.topRange || rangeA.topRange < rangeB.bottomRange){
      //範囲なし
      return {bottomRange: -1, topRange: -1}
    }
  }

  if( isExistRange(rangeA) && isExistRange(rangeB) ){
    bottomRange = rangeA.bottomRange > rangeB.bottomRange ?
      rangeA.bottomRange : rangeB.bottomRange
    topRange = rangeA.topRange < rangeB.topRange ?
      rangeA.topRange : rangeB.topRange

  }else if( isZeroRange(rangeA) ){
    bottomRange = rangeB.bottomRange
    topRange = rangeB.topRange

  }else if( isZeroRange(rangeB) ){
    bottomRange = rangeA.bottomRange
    topRange = rangeA.topRange
  }else{
    bottomRange = -1
    topRange = -1
  }

  return {bottomRange, topRange}
}

const calcYoungTypeAndJudge = (range,rangePeakAnd,phase) => {
  const resultRange = range

  if( (phase.nagir1 !== 0 && rangePeakAnd.nagir1.length === 0) ||
    (phase.nagir2 !== 0 && rangePeakAnd.nagir2.length === 0) ){
    //入力がリスト範囲にない
    resultRange.a = {bottomRange: -1, topRange: -1}
    resultRange.b = {bottomRange: -1, topRange: -1}
  }
  
  if(rangePeakAnd.nagir1.length !== 0){
    const rangeNagir1A = rangePeakAnd.nagir1.filter(list => (list.type === "早熟"))
    if(rangeNagir1A.length === 0){
      resultRange.a = {bottomRange: -1, topRange: -1}
    }
    for( const range1 of rangeNagir1A ){
      resultRange.a = calcRange(resultRange.a, range1)
    }

    const rangeNagir1B = rangePeakAnd.nagir1.filter(list => (list.type === "持続"))
    if(rangeNagir1B.length === 0){
      resultRange.b = {bottomRange: -1, topRange: -1}
    }
    for( const range1 of rangeNagir1B ){
      resultRange.b = calcRange(resultRange.b, range1)
    }    
  }

  if(rangePeakAnd.nagir2.length !== 0){
    const rangeNagir2A = rangePeakAnd.nagir2.filter(list => (list.type === "早熟"))
    if(rangeNagir2A.length === 0){
      resultRange.a = {bottomRange: -1, topRange: -1}
    }
    for( const range2 of rangeNagir2A ){
      resultRange.a = calcRange(resultRange.a, range2)
    }

    const rangeNagir2B = rangePeakAnd.nagir2.filter(list => (list.type === "持続"))
    if(rangeNagir2B.length === 0){
      resultRange.b = {bottomRange: -1, topRange: -1}
    }
    for( const range2 of rangeNagir2B ){
      resultRange.b = calcRange(resultRange.b, range2)
    }
  }

  //ナギール追加で早熟はピークにならない。持続は5段階にならない。{
  if(phase.nagir1 === "phase5"){
    resultRange.b = {bottomRange: -1, topRange: -1}

    if(range.a.bottomRange > 368){
      //360週から早熟も5段階にならない
      resultRange.a = {bottomRange: -1, topRange: -1}
    }
  }
  if(phase.nagir1 === "peak"){
    if(range.a.topRange > 480){
      //481週から早熟もピークになる
      resultRange.a.bottomRange = range.a.bottomRange < 480 ? 481 : range.a.bottomRange
    }else{
      resultRange.a = {bottomRange: -1, topRange: -1}
    }
  }

  if(phase.nagir2 === "phase5"){
    resultRange.b = {bottomRange: -1, topRange: -1}
  }
  if(phase.nagir2 === "peak"){
    resultRange.a = {bottomRange: -1, topRange: -1}
  }
    

  return resultRange
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
    a: {bottomRange: props.range.a.bottomRange, topRange: props.range.a.topRange},
    b: {bottomRange: props.range.b.bottomRange, topRange: props.range.b.topRange},
    c: {bottomRange: props.range.c.bottomRange, topRange: props.range.c.topRange},
    d: {bottomRange: props.range.d.bottomRange, topRange: props.range.d.topRange},
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
    const rangePeak = calcPeak(this.props.peak)
    const rangeRetire = calcRetire(this.props.retire)
    const rangePeakAnd = calcPeakAfterPhase(rangePeak, this.props.peakAnd1, this.props.peakAnd2)
    const phase = {nagir1: this.props.peakAnd1, nagir2: this.props.peakAnd2}

    let range = {
      //a.早熟 b.持続 c.普通 d.晩成
      a: calcRange(rangePeak.a, rangeRetire.a),
      b: calcRange(rangePeak.b, rangeRetire.b),
      c: calcRange(rangePeak.c, rangeRetire.c),
      d: calcRange(rangePeak.d, rangeRetire.d),
    }

    range = calcYoungTypeAndJudge(range,rangePeakAnd,phase)

    return (
      <div>
      <EstimateLife range={range} />
      <p />
      <EstimateLife className="inline-block" range={rangePeak} />
      <EstimateLife className="inline-block" range={rangeRetire} />
      </div>
    )
  }
}


export default Output;