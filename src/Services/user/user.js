
import request from 'umi-request';

export function updateUser(params){
  return(
    request
      .put('http://172.16.9.129:3000/user/updateUserInfo',{
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
export function getUser(params){
  return(
    request
      .get(`http://172.16.9.129:3000/user?id=${params.id}`)
      .then(function(response){
        return response;
      })
      .then(function(err){
        return err;
      })
  )
}
export function getBooks(params){
  return(
    request
      .post(`http://172.16.9.129:3000/user/getBooks`,{
        data:{
          ...params
        }
      })
      .then(function(response){
        return response;
      })
      .then(function(err){
        return err;
      })
  )
}
