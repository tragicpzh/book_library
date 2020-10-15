import {registerUser as create,confirmUser as confirm} from '../Services/login/login'
import {updateUser,getUser} from '../Services/user/user'
import { message } from 'antd';
export default {
  namespace:'user',
  state:{
    username:'',
    password:'',
    email:'',
    telephone:'',
    isLogin:false,
    isSameName:false,
    id:'',
  },
  reducers:{
    updateState(state,action){
      return {...state,...action.payload}
    }
  },
  effects:{
    *query({},{put,call,select}) {
      const {id}=yield select(tmp=>tmp['user']);
      const params={id};
      const data = yield call(getUser,params);
      if (!data.success) message.error("获取个人信息失败");
      else {
        yield put({
          type:'updateState',
          payload:{
            ...data.data
          }
        })
      }
    },
    *update({payload,callback},{select,call,put}){
      const {id}=yield select((tmp)=>tmp['user']);
      const params={
        id,
        ...payload
      };
      const data=yield call(updateUser,params);
      if(data.success){
        yield put({
          type:'updateState',
          payload:{
            ...params
          }
        })
        callback&&callback(true);
      }
      else{
        callback&&callback(false);
      }
    },
    *register({payload,callback},{call}){
      const params={...payload};
      const data=yield call(create,params);
      if(data.success){
        callback&&callback(true);
      }
      else {
        callback&&callback(false);
      }
    },
    *login({payload,callback},{call,put}){
      const params={...payload};
      const data=yield call(confirm,params);
      if(data.success){
        yield put({
          type:'updateState',
          payload:{
            username:data.data.username,
            password:data.data.password,
            role:data.data.role,
            email:data.data.email|'',
            telephone: data.data.telephone|'',
            id:data.data.id,
            isLogin: true,
          }
        })
        callback&&callback(true);
      }
      else {
        callback&&callback(false);
      }

    }
  },
  subscriptions:{
    setup({dispatch,history}){
      history.listen(location=>{
        if(location.pathname==='/users/userInfo'){
            dispatch({
              type:'query'
            });
        }
      })
    }
  }
}
