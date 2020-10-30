import React, {useState} from "react";
import {message} from "antd";
import umiRequest from '@/utils/request'
const Size=10*10*1024
const Index=()=>{
  const [File,setFile]=useState(null);
  const [chunks,setChunks]=useState(null);
  const [percent,setPercent]=useState([]);
  const getFiles=(e)=>{
    const file=e.target.files[0];
    if(!file)return
    setFile(file);
  }
  const merge=(count,fileName)=>{
    return umiRequest
                .post('http://172.16.9.129:3000/file/merge',{
                  data:{
                    size:Size,
                    count,
                    fileName
                  }
                })

  }
  const tryMerge=(count,fileName)=>{
    setTimeout(()=>{
      merge(count,fileName).then((response)=>{
        if(response.error==='未接收到全部文件')tryMerge(count,fileName);
      })
    },100);
  }
  const upload=async ()=>{
    if(!File){
      message.error("上传文件不存在");
      return;
    }
    const fileChunks=createFileChunk(File,Size);
    setChunks(fileChunks)
    setPercent([]);
    await uploadChunks(fileChunks);
    const count=fileChunks.length;
    const fileName=File.name;
    tryMerge(count,fileName);
  }
  const request=(url,method="post",data,header={},index)=>{
    return new Promise(resolve => {
        const xhr=new XMLHttpRequest();
        xhr.open(method,url);
        Object.keys(header).forEach(key=>{
          xhr.setRequestHeader(key,header[key]);
        })
      xhr.upload.onprogress=(e)=>{
          setPercent();
      }
      xhr.onload=()=>{
        resolve(xhr.response)
      }
      xhr.send(data);
    })
  }
  const createFileChunk=(file,size=Size)=>{
    const fileChunks=[];
    let cur=0;
    while(cur<file.size){
      fileChunks.push(file.slice(cur,Math.min(file.size,cur+size)));
      cur+=size
    }
    setChunks(fileChunks);
    return fileChunks;
  }
  const uploadChunks=async (chunks=[])=>{
    const requestList=chunks.map((chunk,index)=>{
      const hash=File.name+'-'+index;
      const url='http://172.16.9.129:3000/file/upload';
      const formData=new FormData();
      formData.append('chunk',chunk);
      formData.append('hash',hash);
      formData.append('fileName',File.name)
      formData.append('count',chunks.length.toString());
      return request(url,"post",formData,{},index);
    })
    await Promise.all(requestList)
  }
  return(
    <>
      <input type="file" onChange={e=>getFiles(e)}/>
      <button type="submit" onClick={upload}>上传</button>
      <span>{percent.reduce((pre,cur)=>{
        console.log(pre,cur);
        return pre+cur/chunks.length;
      },0)}</span>
    </>
  )
}
export default Index;
