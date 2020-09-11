import React, {useEffect, useRef, useState} from "react";
import ReactDOM from 'react-dom';
const ShadowContent=({root,children})=>{
  return ReactDOM.createPortal(children,root);
}
const ShadowView=({children}:any)=>{
  const shadowRef=useRef();
  const [root,setRoot]=useState(null);
  useEffect(()=>{
    const elm=shadowRef.current;
    // @ts-ignore
    const shadowRoot=elm.attachShadow({mode:"open"});
    setRoot(shadowRoot);
  },[]);
  return(
    <div ref={shadowRef}>
    {
      root&&<ShadowContent root={root}>{children}</ShadowContent>
    }
    </div>
  )
}
export default ShadowView;
