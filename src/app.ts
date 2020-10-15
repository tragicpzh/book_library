import {getApp} from "@@/plugin-dva/dva";


let lastPathName;

export function onRouteChange({location}){
  const dispatch=getApp()._store.dispatch;
  if(location.pathname!==lastPathName){
    lastPathName=location.pathname;
    dispatch({
      type:'global/updateState',
      payload:{
        route:location.pathname
      }
    })
  }
}
