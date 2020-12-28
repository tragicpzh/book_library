import React, {useCallback, useEffect, useRef, useState} from "react";
import {MySocket} from "@/components/webSocket";
import {} from 'rxjs';
import {} from 'rxjs/operators'
import {Input} from "antd";
import styles from './index.less';
import {useSelector} from "@@/plugin-dva/exports";
const url='ws://172.16.9.129:4000';
let socket=null;
const Index=()=>{
  const [list,setList]=useState([]);
  const [send,setSend]=useState('');
  const [count,setCount]=useState(1);
  const messages=useRef([]);
  const chat=useRef(null);
  const {username,id}=useSelector(({user}:any)=>({
    username:user.username,
    id:user.id,
  }))
  const onSend=({data})=>{
    const message=JSON.parse(data);
    if(!message||message.type!=='send') return;;
    const nowList=messages.current;
    nowList.push(message.data);
    setList([].concat(nowList));
    chat.current.scrollTop=chat.current.scrollHeight;
  };

  const onHeartCheck=({data})=>{
    const message=JSON.parse(data);
    if(!message||message.type!=='heartCheck')return;
    setCount(message.count)
    socket.send(JSON.stringify({event:'heartCheck',data:null}))
  }

  useEffect(()=>{
    socket=new MySocket(url);
    socket.createSocket();
    socket.registerEvent('onmessage',onSend,'onSend')
    socket.registerEvent('onmessage',onHeartCheck,'onHeartCheck');
    return ()=>{
      socket.closeSocket();
    }
  },[]);
  const sendMessage=()=>{
    if(!send)return;
    socket.send(JSON.stringify({event:'send',data:{content:send,username:username,id:id}}));
    setSend('');
  }
  return (
    <div>
      <div>
        在线人数:&nbsp;{count}
      </div>
      <div className={styles.chat} ref={(node)=>chat.current=node}>
        {
          list.map(item=>(
            item.id!==id
              ?
              <div>
                <div className={styles.chatName}>{item.username}</div>
                &nbsp;&nbsp;
                <div className={styles.chatItem}>
                  <span>
                    {item.content}
                  </span>
                </div>
              </div>
              :
              <div style={{display:"flex",justifyContent:"flex-end"}}>
                <div className={styles.chatItem}>
                <span>
                  {item.content}
                </span>
                </div>
                &nbsp;&nbsp;
                <div className={styles.chatName}>{item.username}</div>
              </div>
          ))
        }
      </div>
      <Input onChange={(e)=>setSend(e.target.value)} onPressEnter={()=>sendMessage()} value={send}></Input>
    </div>
  )
}
export default Index;
