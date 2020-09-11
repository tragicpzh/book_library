import {Effect,Reducer,Subscription} from 'umi';
import { message } from 'antd';
import {getData as get,createData as create}from '@/Services/bookTypeAnalyze/bookTypeAnalyze';
const namespace='bookTypeAnalyze';
const src='/users/bookTypeAnalyze';
interface bookTypeAnalyzeStateType{
  types:any[]
  list:any[]
}
interface bookTypeAnalyzeType{
  name:string
  state:bookTypeAnalyzeStateType
  effects:{
    query:Effect,
    update:Effect,
  }
  reducers:{
    updateState:Reducer<bookTypeAnalyzeStateType>
  }
  subscriptions:{
    setup:Subscription
  }
}
const bookTypeAnalyzeModel:bookTypeAnalyzeType={
  name:namespace,
  state:{
    types:[],
    list:[]
  },
  reducers:{
    updateState(state,action){
      return {...state,...action.payload};
    }
  },
  effects:{
    *query({},{call,put}){
      const data=yield call(get);
      if(data.success){
        yield put({
          type:'updateState',
          payload:{
            types:data.data.types,
            list:data.data.list,
          }
        });
        console.log(data.data.list);
        message.success("获取数据成功")
      }
      else{
        message.error("获取数据失败")
      }
    },
    *update({},{call,put}){
      const data=yield call(create);
      if(data.success){
        yield put({
          type:'updateState',
          payload:{
            types:data.data.types,
            list:data.data.list,
          }
        })
        console.log(data.data.list);
        message.success("获取数据成功")
      }
      else{
        message.error("更新数据失败")
      }
    }
  },
  subscriptions:{
    setup({dispatch,history}){
      history.listen(location => {
        if(location.pathname===src){
          console.log("yes");
          dispatch({
            type:'query'
          });
        }
      })
    }
  }
}
export default bookTypeAnalyzeModel;
