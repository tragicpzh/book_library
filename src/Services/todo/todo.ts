import request from "@/utils/request";

export function getTodos(params){
  return(
    request.post('http://172.16.9.129:3000/todo/getTodos',{
      data:{
        ...params
      }
    })
      .then(response=>response)
      .catch(err=>err)
  )
}
