import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { useSelector } from 'dva';
import { getDvaApp } from 'umi';
import {debounce} from 'lodash';

const BookRecommend = () => {
  const { initImgs } = useSelector(({ recommends }: any) => ({
    initImgs: recommends.imgs,
  }));
  const [imgs, setImgs] = useState([]);

  const scrollHandle = e => {
    const offsetHeight = 20;
    const Top = e.target.scrollTop;
    const Height = e.target.clientHeight;
    const imgs = getDvaApp()._store.getState().recommends.imgs;
    const dispatch = getDvaApp()._store.dispatch;
    imgs.forEach((item, index) => {
      console.log('item:', item);
      const height = item.reduce(
        (now, next) => now + next.height + offsetHeight,
        0,
      );
      if (height < Top + Height + 20) {
        const min=Top + Height + 20-height;
        dispatch({
          type: 'recommends/addImg',
          payload: {
            index,
            height:Math.floor(Math.random()*100+min)
          },
        });
      }
    });
  };

  useEffect(() => {
    const node = document.getElementById('waterfall');
    node.onscroll = debounce(scrollHandle,100);
    return () => {
      node.onscroll = null;
    };
  }, []);

  useEffect(() => {
    setImgs(initImgs);
  }, [initImgs]);

  return (
    <div id="waterfall" className={styles.waterfall}>
      <div className={styles.columns}>
        {imgs.length > 0 &&
          imgs[0].map(item => {
            const style = {
              margin: 20,
            };
            return (
              <img
                src={`http://172.16.9.129:3000${item.src}`}
                width="200px"
                height={`${item.height}px`}
                style={style}
              />
            );
          })}
      </div>
      <div className={styles.columns}>
        {imgs.length > 1 &&
          imgs[1].map(item => {
            const style = {
              margin: 20,
            };
            return (
              <img
                src={`http://172.16.9.129:3000${item.src}`}
                width="200px"
                height={`${item.height}px`}
                style={style}
              />
            );
          })}
      </div>
      <div className={styles.columns}>
        {imgs.length > 2 &&
          imgs[2].map(item => {
            const style = {
              margin: 20,
            };
            return (
              <img
                src={`http://172.16.9.129:3000${item.src}`}
                width="200px"
                height={`${item.height}px`}
                style={style}
              />
            );
          })}
      </div>
    </div>
  );
};

export default BookRecommend;
