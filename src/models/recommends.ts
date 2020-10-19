import * as api from '@/Services/recommend/recommend';
const namespace = 'recommends';
export default {
  namespace: namespace,
  state: {
    imgs: [],
  },
  reducers: {
    updateState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  effects: {
    *getImgs(_, { call, put }) {
      const data = yield call(api.getImgs);
      if (data.httpCode === 200) {
        console.log(data.data.imgs);
        yield put({
          type: 'updateState',
          payload: {
            imgs: data.data.imgs,
          },
        });
      }
    },
    *addImg({ payload }, { call, select, put }) {
      const data = yield call(api.addImg);console.log("yes");
      if (data.httpCode === 200) {
        const { imgs } = yield select(({ recommends }: any) => ({
          imgs: recommends.imgs,
        }));
        const { index ,height} = payload;
        const { img } = data;
        imgs[index].push({
          height,
          src: img.src,
        });

        yield put({
          type: 'updateState',
          payload: {
            imgs: imgs,
          },
        });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/users/bookRecommend') {
          dispatch({
            type: 'getImgs',
          });
        }
      });
    },
  },
};
