const namespace='global';
const initState={
  route:'/users/userInfo'
}
export default {
  namespace,
  state:{
    ...initState
  },
  reducers:{
    updateState(state,action){
      return{
        ...state,
        ...action.payload
      }
    }
  }
}
