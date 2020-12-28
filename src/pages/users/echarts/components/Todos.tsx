import React, {useEffect, useState} from "react";
import {Alert, Button, Drawer,Card,Icon} from "antd";
import styles from './todos.less'
const Index=({addData,onClose,className})=>{
  const [todos,setTodos]=useState([]);
  const [visible,setVisible]=useState(false)
  useEffect(()=>{
    const newTodos=[];
    addData.forEach((item,index)=>{
      if(item.value===0)return;
      const message=(
        <div className={styles.todo} key={index}>
          <div>{item.book}</div>
          <div>
            {item.value}小时
            <Icon type={"close"} onClick={()=>onClose(item.book)}/>
          </div>
        </div>
      );
      newTodos.push(
        <div className={styles.cardText}>
          <Card >
            {message}
          </Card>
        </div>
      )
    })
    setTodos(newTodos);
  },[addData])
  const head=(
    <div className={styles.todo}>
      <div>书名</div>
      <div>计划阅读时间</div>
    </div>
  );
  return(
    <>
      <Button
        type="primary"
        onClick={()=>setVisible(true)}
        className={className}
      >
        查看阅读计划
      </Button>
      <Drawer
        title="下一个月阅读计划"
        placement="right"
        closable={false}
        onClose={()=>setVisible(false)}
        visible={visible}
      >
        <Alert message={head}/>
        {todos}
      </Drawer>
    </>
  )
};
export default Index;
