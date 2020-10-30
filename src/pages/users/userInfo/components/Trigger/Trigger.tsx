import React, {useRef, useState} from "react";
import Trigger, {BuildInPlacements, TriggerProps} from 'rc-trigger';
import {Input} from "antd";
import './index.less';
import DatePicker from '../DatePicker/index'
const Build_Placement:BuildInPlacements={
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 1,
      adjustY: 1,
    },
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 1,
      adjustY: 1,
    },
  },
  bottomRight: {
    points: ['tr', 'br'],
    offset: [0, 4],
    overflow: {
      adjustX: 1,
      adjustY: 1,
    },
  },
  topRight: {
    points: ['br', 'tr'],
    offset: [0, -4],
    overflow: {
      adjustX: 1,
      adjustY: 1,
    },
  },
}
const Index=()=>{
  const triggerRef=useRef();
  const [popupVisible,setVisible]=useState(false);
  const [date,setDate]=useState(null);
  const input=<Input id="trigger" value={date?`${date.year}/${date.month}/${date.date}`:''}/>;
  const onChangeVisible=(visible)=>{
    console.log(visible)
    setVisible(visible)
  }
  const onSelect=(newDate)=>{
    setDate(newDate);
  }
  const onConfirm=()=>{
    setVisible(false);
  }
  const TriggerProps:TriggerProps={
    popup:<DatePicker onSelect={onSelect} onConfirm={onConfirm}></DatePicker>,
    children:input,
    action:['click'],
    popupVisible:popupVisible,
    builtinPlacements:Build_Placement,
    popupPlacement:'bottomLeft',
    popupStyle:{
      position:"absolute"
    },
    prefixCls:'datepicker-popup',
    onPopupVisibleChange:onChangeVisible
  };
  return(
    <Trigger
      ref={triggerRef}
      {...TriggerProps}>
      {input}
    </Trigger>
  )
}
export default Index;
