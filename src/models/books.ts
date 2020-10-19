import * as api from '@/Services/book/book'
const namespace = 'books';
const initState = {
  books: [],
  pageSize:10,
  pageNo:1,
  total:0,
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
      const { id,pageNo,pageSize } = yield select(({ user,books }: any) => ({ id: user.id ,pageNo:books.pageNo,pageSize:books.pageSize}));
      if(!id)return;
      const params = {
        id,
        pageSize,
        pageNo,
        ...payload,
      };
      const data = yield call(api.getBooksList,params);
      if (data.httpCode === 200) {
        yield put({
          type: 'updateState',
          payload: {
            books: data.data.list,
            total:data.data.total,
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
