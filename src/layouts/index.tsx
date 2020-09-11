import React from 'react';
import Login from '@/layouts/login';
import UserIndex from '@/layouts/user';
import { useSelector } from '@@/plugin-dva/exports';
import { Redirect } from 'umi';
const index=(props:any)=>{
  const {isLogin}=useSelector((tmp:any)=>tmp['user']);

  if(props.location.pathname.indexOf('/users')!=-1){
    if(!isLogin){
      return  <Redirect to="/login"></Redirect>
    }
    return <UserIndex>{props.children}</UserIndex>
  }
  return(
    <Login>{props.children}</Login>
  )
}
export default index;
