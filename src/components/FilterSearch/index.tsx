import React, { useEffect, useState } from 'react';
import { Checkbox, Input, Button } from 'antd';
import { Filter, FilterProps } from './interface';
import styles from './style.less';

// 默认为根据value的模糊搜索
const onSearch = (value, filter, setCurFilter) => {
  if (value && value !== '') {
    let list = filter.filter(item => item.value.indexOf(value) > -1);
    setCurFilter(list);
  } else {
    setCurFilter(filter);
  }
};

const Index = ({ selectKeys, setSelectedKeys, confirm, filter, onSearchFilter = onSearch, visible, multiple = false }: FilterProps) => {
  const [searchText, setSearch] = useState('');
  const [curFilter, setCurFilter] = useState([] as Array<Filter>);
  const [hasConfirm, setConfirm] = useState(false);

  useEffect(() => {
    //筛选框打开时清空搜索内容
    if (visible) {
      setSearch('');
      setCurFilter(filter);
      setConfirm(false);
    }
    //筛选框关闭（按钮以外的方式）时，提交筛选内容
    if (!visible) {
      if (!hasConfirm) {
        setConfirm(true);
        confirm();
      }
    }
  }, [visible]);

  const onReset = () => {
    setSelectedKeys([]);
    setConfirm(true);
    confirm();
  };

  const onConfirm = () => {
    setConfirm(true);
    confirm();
  };

  const onChange = (e, value) => {
    if (e.target.checked) {
      setSelectedKeys(multiple ? selectKeys.concat([value]) : [value]);
    } else {
      setSelectedKeys(selectKeys.filter(item => item !== value));
    }
  };

  const handleSearch = value => {
    setSearch(value);
    search(value);
  };

  const search = (value: string = '') => {
    onSearchFilter(value, filter, setCurFilter);
  };

  return (
    <div className={styles.filterWrapper}>
      <div style={{ padding: '8px' }}>
        <Input.Search
          placeholder="请输入名称"
          onChange={e => handleSearch(e.target.value)}
          value={searchText}
        />
      </div>
      <div>
        {
          curFilter && curFilter.length > 0
            ?
            <div className={styles.filterCheckbox}>
              {
                curFilter.map((item, index) => {
                  return (
                    <div key={index}>
                      <Checkbox
                        onChange={(e) => onChange(e, item.value)}
                        checked={selectKeys && selectKeys.indexOf(item.value) > -1}
                      >
                        {item.text}
                      </Checkbox>
                    </div>
                  );
                })
              }
            </div>
            :
            <p className={styles.notSearchResult}>无搜索结果</p>
        }
      </div>
      <div className="ant-table-filter-dropdown-btns">
        <Button type="link" className={styles.clear} onClick={() => onReset()}>重置</Button>
        <Button type="link" className={styles.confirm} onClick={() => onConfirm()}>确定</Button>
      </div>
    </div>
  );
};
export default Index;
