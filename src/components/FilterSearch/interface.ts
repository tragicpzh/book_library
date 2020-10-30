import React, { ReactNode } from 'react';
export type Filter={
  /** 筛选项的文本内容*/
  text: ReactNode;
  /** 筛选项的对应值*/
  value: string;
}

export interface FilterProps {
  /** ant-table的筛选选中项数组*/
  selectKeys: (string|number)[];
  /** ant-table的设置筛选选中项方法*/
  setSelectedKeys: (selectedKeys: (string|number)[]) => void;
  /** ant-table的提交筛选项方法*/
  confirm: () => void;
  /** 筛选项数组*/
  filter: Filter[];
  /** 筛选搜索的自定义函数，默认根据value模糊搜索*/
  onSearchFilter?: (value: string, filter: Filter[], setFilter: React.Dispatch<React.SetStateAction<Filter[]>>) => void;
  /** ant-table的筛选框显示状态*/
  visible: boolean;
  /** 筛选是否多选，默认为true*/
  multiple?: boolean;
}