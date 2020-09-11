import React from 'react';
import { Menu } from 'antd';
import {NavLink} from 'umi';
import style from './NavSider.less'
const NavSider=()=>{
  return (
    <Menu
      mode="inline"
      className={style.nav}
    >
      <Menu.Item key="1">
          <NavLink to="/users/userInfo">个人信息</NavLink>
      </Menu.Item>
      <Menu.Item key="2">
          <NavLink to="/users/todo">待办事项</NavLink>
      </Menu.Item>
      <Menu.Item key="3">
          <NavLink to="/users/bookManage">书籍管理</NavLink>
      </Menu.Item>
      <Menu.Item key="4">
          <NavLink to="/users/bookRecommend">书籍推荐</NavLink>
      </Menu.Item>
      <Menu.Item key="5">
          <NavLink to="/users/roomApply">申请自习室</NavLink>
      </Menu.Item>
      <Menu.Item  key="6">
          <NavLink to="/users/echartForadmin">数据分析</NavLink>
      </Menu.Item>
      <Menu.Item  key="7">
        <NavLink to="/users/bookTypeAnalyze">数据分析</NavLink>
      </Menu.Item>
    </Menu>
  );
}
export default NavSider;
