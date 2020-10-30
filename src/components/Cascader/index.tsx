import React, {useState} from "react";
import RcCascader from 'rc-cascader'
import {Input, Icon, Upload, Button} from "antd";
import './index.less'
const Index=()=>{
  const [visible,setVisible]=useState(false);
  const [text,setText]=useState('1-1');
  const [value,setValue]=useState(['1-1']);
  const options=[
    {
      label:'1-1',
      value:'1-1',
      children:[
        {
          label:'2-1',
          value:'2-1',
        }
      ]
    },
    {
      label:'1-2',
      value:'1-2',
      children:[
        {
          label: '2-2',
          value:'2-2',
          children:[
            {
              label:'3-1',
              value:'3-1'
            }
          ]
        },
        {
          label:'2-3',
          value:'2-3'
        }
      ]
    }
  ]
  const onChange=(values,selects)=>{
    setText(values.join('/'))
    setValue(values);
  }
  return (
    <>
      <RcCascader
        options={options}
        prefixCls={'ant-cascader'}
        popupVisible={visible}
        onPopupVisibleChange={setVisible}
        onChange={onChange}
        changeOnSelect={false}
        value={value}
      >
        <div className={'demo-cascader-wrapper'}>
          <Input
            value={text}
            readOnly={true}
            className={'demo-cascader-input'}
          />
          <Icon type="close-circle" theme="filled" className={`demo-cascader-clear-${text.length>0?'on':'off'}`} onClick={(e)=>{e.stopPropagation();setText('')}}/>
          <Icon type={visible?'down':'up'} className={'demo-cascader-icon'}/>
        </div>
      </RcCascader>
    </>
  )
}
export default Index
