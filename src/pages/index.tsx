import React from 'react';
import {Redirect} from 'umi'
import styles from './index.less';
import Login from '@/layouts/login';
export default () => {
  return (
    <Redirect to="/login"></Redirect>
  );
}
