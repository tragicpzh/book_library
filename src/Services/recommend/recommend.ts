import request from "@/utils/request";

export function getImgs(){
  return(
    request.post('http://172.16.9.129:3000/recommend/getImgs')
      .then((response)=>{
        return response
      })
      .catch((err)=>{
        return err;
      })
  )
}

export function addImg(){
  return(
    request.post('http://172.16.9.129:3000/recommend/addImg')
      .then((response)=>{
        return response
      })
      .catch((err)=>{
        return err;
      })
  )
}
