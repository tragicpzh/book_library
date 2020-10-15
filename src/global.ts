import track from '@firesoon/log-sdk';
import error from "pzh-js-error-log";
const handle=(e)=>{
  track.config({
    classname:['ant-input']
  })
  const logData=track.getLogData(e);
  //if(logData)track.sendBeacon('http://172.16.9.129:3000/log',JSON.stringify(logData));
}
track.listener.on(document.body,'input',handle);
const handleError=(e,u,l)=>{
  const result=e+' '+u+' '+l;
 // if(result)track.sendBeacon('http://172.16.9.129:3000/log',JSON.stringify(result));
}
error.listener.on(handleError);
