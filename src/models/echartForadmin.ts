import {Effect,Reducer,Subscription} from 'umi';
import { message } from 'antd';
import {getData} from '@/Services/echartForadmin/echarForadmin';
const namespace='echartForadmin';
const src='/users/echartForadmin';
interface echartForadminStateType{
  data:any[],
  start:string,
  end:string,
}
interface echartForadminType{
  name:string
  state:echartForadminStateType
  effects:{
    query:Effect
  }
  reducers:{
    updateState:Reducer<echartForadminType>
  }
  subscriptions:{
    setup:Subscription
  }
}
const echartForadminModel:echartForadminType={
  name:namespace,
  state:{
    data:[],
    start:'',
    end:''
  },
  reducers:{
    updateState(state,action){
        return {
          ...state,
          ...action.payload
        }
    }
  },
  effects:{
    *query({payload},{call,put}){
      console.log(payload);
      const params={
        start:payload.start,
        end:payload.end
      }
      const data=yield call(getData,params);
      if(data.success){
        message.success("获取数据成功")
        yield put({
          type:'updateState',
          payload:{
            data:data.data.data,
            start:data.data.start,
            end:data.data.end
          }
        })
      }
      else {
        message.error("获取数据失败")
      }
    }
  },
  subscriptions:{
    setup({dispatch,history}){
      history.listen(location => {
        if(location.pathname===src){
          dispatch({
            type:'updateState',
            payload:{
              data:[],
              start:'',
              end:''
            }
          })
        }
      })
    }
  }
}

export default echartForadminModel;
