import React, {useState} from "react";
import {InputNumber, Progress} from "antd";
const Index=()=>{
  const [value,setValue]=useState(0);
  const changeValue=(newValue)=>{
    setValue(newValue||0)
  }
  return(
    <div>
      <InputNumber min={0} max={100} step={1} precision={1} value={value} onChange={changeValue}/>
      <Progress percent={value}></Progress>
    </div>
  )
}
export default Index;
