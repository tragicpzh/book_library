import {Reducer,Effect,Subscription} from "umi";
import {cloneDeep} from 'lodash';
import * as api from '@/Services/room/room'

const namespace='rooms'
const initState:roomsStateType={
  rooms:[]
}
interface roomsStateType{
  rooms:any[]
}
interface roomsModelType{
  namespace:string,
  state:roomsStateType,
  reducers:{
    updateState:Reducer<roomsStateType>
  }
  effects:{
    getRooms:Effect,
    updateRoom:Effect
  }
  subscriptions:{
    setup:Subscription
  }
}
const roomsModel:roomsModelType={
  namespace:namespace,
  state:cloneDeep(initState),
  subscriptions:{
      setup({dispatch,history}){
        history.listen(location => {
          if(location.pathname==='/users/roomApply'){
            dispatch({
              type:'getRooms'
            })
          }
        })
      }
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
    *getRooms({payload},{call,select,put}){
      const {userId}=yield select(({user}:any)=>({userId:user.id}));
      const params={
        userId,
        ...payload
      }
      const data=yield call(api.getRooms,params);
      if(data.httpCode===200){
        yield put({
          type:'updateState',
          payload:{
            rooms:data.data.list
          }
        })
      }
    },
    *updateRoom({payload},{call,select,put}){
      const {userId}=yield select(({user}:any)=>({userId:user.id}));
      const params={
        userId,
        ...payload
      }
      const data=yield call(api.updateRoom,params);
      if(data.httpCode===200){
          yield put({
            type:'getRooms'
          })
      }
    }
  }
}
export default roomsModel;
