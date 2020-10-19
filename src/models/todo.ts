import {Reducer,Effect,Subscription} from "umi";
import {cloneDeep} from 'lodash'
import * as api from '@/Services/todo/todo'
const namespace='todo';
const todoTypes=[
  'bookManage',
  'roomApply',
  'echartForadmin'
]
const initState:todoModelStateType = {
  todos:[
    {
      id: 'todo-1',
      color: 'red',
      name: '归还图书',
      todo: '10月20日前归还图书（编号:101)',
      to: '/users/bookManage',
    },
    {
      id: 'todo-2',
      color: 'green',
      name: '归还图书',
      todo: '10月30日前归还图书（编号:102)',
      to: '/users/bookManage',
    },
    {
      id: 'todo-3',
      color: 'yellow',
      name: '归还图书',
      todo: '10月25日前归还图书（编号:103)',
      to: '/users/bookManage',
    },
  ]
};
interface todosType{
  id:string
  color:"green"|"yellow"|"red"
  name:string
  todo:string
  to:string

}
interface todoModelStateType{
  todos:Array<todosType>
}
interface todoModelType{
  namespace:string
  state:todoModelStateType
  reducers:{
    updateState:Reducer<todoModelStateType>
  }
  effects:{
    getTodos:Effect
  }
  subscriptions:{
    setup:Subscription
  }
}
const TodoModel:todoModelType={
  namespace:namespace,
  state:cloneDeep(initState),
  reducers:{
    updateState(state,action){
      return{
        ...state,
        ...action.payload
      }
    }
  },
  effects:{
    * getTodos({payload},{select,call,put}){
      const {userId}=yield select(({user}:any)=>({userId:user.id}))
      const params={
        userId,
        ...payload
      }
      const data=yield call(api.getTodos,params);
      if(data.httpCode===200){
        const todos=data.data.list.map((item,index)=>{
          item.id=`todo-${index}`
          item.to=`/users/${todoTypes[item.to]}`
          return item;
        })
        console.log(data)
        yield put({
          type:'updateState',
          payload:{
            todos,
          }
        })
      }
    }
  },
  subscriptions:{
    setup({dispatch,history}){
      history.listen(location => {
        if(location.pathname===`/users/${namespace}`){
          dispatch({
            type:'getTodos'
          })
        }
      })
    }
  }
}
export default TodoModel;
