import * as api from '@/Services/book/book'
const namespace = 'books';
const initState = {
  books: [],
};
export default {
  namespace: namespace,
  state: {
    ...initState,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/users/bookManage') {
          dispatch({
            type: 'getBooksList',
          });
          console.log("yes")
        }
      });
    },
  },
  effects: {
    *renew({ payload }, { call, put, select }) {
      const { id } = yield select(({ user }: any) => ({ id: user.id }));
      const params = {
        ...payload,
      };
      const data = yield call(api.booksRenew,params);
      if (data.httpCode === 200) {
        yield put({
          type: 'getBooksList',
          payload: {
            id,
          },
        });
      }
    },
    *getBooksList({ payload }, { call, select, put }) {
      console.log("no")
      const { id } = yield select(({ user }: any) => ({ id: user.id }));
      if(!id)return;
      const params = {
        id,
        ...payload,
      };
      const data = yield call(api.getBooksList,params);
      console.log(data,params);
      if (data.httpCode === 200) {
        yield put({
          type: 'updateState',
          payload: {
            books: data.data.list,
          },
        });
      }
    },
  },
  reducers: {
    updateState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
