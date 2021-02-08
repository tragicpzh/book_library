import {
  registerUser as create,
  confirmUser as confirm,
} from '../Services/login/login';
import { updateUser, getUser ,getBooks} from '../Services/user/user';
import { message } from 'antd';
export default {
  namespace: 'user',
  state: {
    username: '',
    password: '',
    email: '',
    telephone: '',
    isLogin: false,
    isSameName: false,
    id: '',
    books: [
      { name: '测试1', code: 'test1' },
      { name: '测试2', code: 'test2' },
      { name: '测试3', code: 'test3' },
      { name: '测试4', code: 'test4' },
      { name: '测试5', code: 'test5' },
      { name: '测试6', code: 'test6' },
      { name: '测试7', code: 'test7' },
      { name: '测试8', code: 'test8' },
      { name: '测试9', code: 'test9' },
      { name: '测试10', code: 'test10' },
    ],
    pageNo:1,
    pageSize:10,
  },
  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    getBooks:[
      function* ({callback}, { put, call, select }){
        const { pageNo, pageSize, books } = yield select(state => state['user']);
        const data = yield call(getBooks, { pageNo: pageNo + 1, pageSize });
        if (data.httpCode === 200) {
          const newBooks=books.concat(data.data);
          yield put({
            type: 'updateState',
            payload: {
              books: newBooks,
              pageNo: pageNo + 1
            },
          });
          callback&&callback();
        }
      },
      { type: "throttle", ms: 100 }
    ],
    *query({}, { put, call, select }) {
      const { id } = yield select(tmp => tmp['user']);
      const params = { id };
      const data = yield call(getUser, params);
      if (!data.success) message.error('获取个人信息失败');
      else {
        yield put({
          type: 'updateState',
          payload: {
            ...data.data,
          },
        });
      }
    },
    *update({ payload, callback }, { select, call, put }) {
      const { id } = yield select(tmp => tmp['user']);
      const params = {
        id,
        ...payload,
      };
      const data = yield call(updateUser, params);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            ...params,
          },
        });
        callback && callback(true);
      } else {
        callback && callback(false);
      }
    },
    *register({ payload, callback }, { call }) {
      const params = { ...payload };
      const data = yield call(create, params);
      if (data.success) {
        callback && callback(true);
      } else {
        callback && callback(false);
      }
    },
    *login({ payload, callback }, { call, put }) {
      const params = { ...payload };
      const data = yield call(confirm, params);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            username: data.data.username,
            password: data.data.password,
            role: data.data.role,
            email: data.data.email | '',
            telephone: data.data.telephone | '',
            id: data.data.id,
            isLogin: true,
          },
        });
        callback && callback(true);
      } else {
        callback && callback(false);
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/users/userInfo') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
};
