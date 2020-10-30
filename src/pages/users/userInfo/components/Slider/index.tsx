import React, {useState} from "react";
import RcSlider from 'rc-slider'
import './index.less'
const Index=()=>{
  const [value,setValue]=useState(0);
  return(
    <RcSlider
        min={0}
        max={1000}
        step={25}
        prefixCls="test"
        value={value}
        onChange={setValue}
        vertical={false}
        included={true}
    />
  )
}
export default Index
