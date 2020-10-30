import React from "react";
import RcRate from 'rc-rate';
import {Icon} from 'antd';
import './index.less'
const Index=()=>{
  return (
    <RcRate
      count={5}
      defaultValue={3}
      allowHalf={true}
      prefixCls={"rate-test"}
      onChange={console.log}
      character={<Icon type="star" theme="filled" />}
    />
  )
}
export default Index;
