import React from 'react';
import style from './login.less';
const Login =(props:any)=>{
  return <div className={style.normal}>{props.children}</div>
}
export default Login;
