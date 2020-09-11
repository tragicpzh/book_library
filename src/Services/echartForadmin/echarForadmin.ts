import request from '@/utils/request'
export function getData(params:any){
  return(
    request
      .post('http://172.16.9.129:3000/echarts',{
        data:{
          ...params
        }
      })
      .then(function(response){
        return response
      })
      .catch(function(err){
        return err
      })
  )
}
