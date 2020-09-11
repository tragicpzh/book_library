import request from 'umi-request';
export function confirmUser(params){
  return(
    request
      .post("http://172.16.9.129:3000/user",
        {
          data:{
            ...params
          }
        })
      .then(function(response){
        return response;
      })
      .catch(function(err){
        return err;
      })
  )
}
export function registerUser(params){
  return  (
    request
      .post("http://172.16.9.129:3000/user/create",{
        data:{
          ...params
        }
      })
      .then(function(response){
        return response;
      })
      .catch(function(err){
        return err;
      })
  )
}
