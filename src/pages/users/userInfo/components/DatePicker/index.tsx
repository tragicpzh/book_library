import React, {useEffect, useState} from "react";
import './index.less'
const dateHead=[
  '一','二','三','四','五','六','日'
];
declare type saveDate={
  year:number
  month:number
  date:number
}
const Index=(props)=>{
  const [date,setDate]=useState<saveDate>({year:1900,month:1,date:1});
  const [datepicker,setDatePicker]=useState([]);
  useEffect(()=>{
    date&&UpdateDatePiker(date.year,date.month,date.date);
  },[date])
  useEffect(()=>{
    const temp=new Date();
    setDate({
      year:temp.getFullYear(),
      month:temp.getMonth()+1,
      date:temp.getDate(),
    })
  },[])
  const UpdateDatePiker=(year,month,date)=>{
    let nowDay=new Date(year,month-1,1).getDay()-1;
    let nowDates=new Date(year,month,0).getDate();
    let arr=[];
    nowDay=nowDay<0?6:nowDay;
    for(let i=0;i<nowDay;i++){
      let newDate=new Date(year,month-1,-nowDay+i+1);
      arr.push({
        year:newDate.getFullYear(),
        month:newDate.getMonth()+1,
        date:newDate.getDate(),
        classNames:'',
      })
    }
    for(let i=0;i<nowDates;i++){
      let newDate=new Date(year,month-1,i+1);
      arr.push({
        year:newDate.getFullYear(),
        month:newDate.getMonth()+1,
        date:newDate.getDate(),
        classNames:`${newDate.getDate()===date?'datepicker-body-active':'datepicker-body-inMonth'}`
      })
    }
    for(let i=0;nowDates+nowDay+i<42;i++){
      let newDate=new Date(year,month,i+1);
      arr.push({
        year:newDate.getFullYear(),
        month:newDate.getMonth()+1,
        date:newDate.getDate(),
        classNames:'',
      })
    }
    let result=[];
    for(let i=0;i<6;i++) {
      let temp=[];
      for (let j = 0; j < 7; j++) {
          temp.push({
            row:i,
            column:j,
            ...arr[i*7+j]
          })
      }
      result.push(temp);
    }
    setDatePicker(result);
  }
  const onChange=({year,month,date})=>{
    const temp=new Date(year,month-1,date);
    const newDate={
      year:temp.getFullYear(),
      month:temp.getMonth()+1,
      date:temp.getDate()
    };
    setDate(newDate)
    props.onSelect&&props.onSelect(newDate);
  }
  const Confirm=()=>{
    props.onConfirm&&props.onConfirm();
  }
  const Reset=()=>{
    const temp=new Date();
    onChange({
      year:temp.getFullYear(),
      month:temp.getMonth()+1,
      date:temp.getDate(),
    })
  }
  return (
    <>
      <div className="datepicker-header">
        <div className="datepicker-header-jump">
          <a
            onClick={_=>onChange({
              ...date,
              year:date.year-1,
              date:1
            })}
            className="datepicker-header-button"
          >
            {' « '}
          </a>
          <a
            onClick={_=>onChange({
              ...date,
              month:date.month-1,
              date:1
            })}
            className="datepicker-header-button"
          >
            {' ‹ '}
          </a>
        </div>
        <span>
          {`${date.year}年${date.month}月`}
        </span>
        <div className="datepicker-header-button">
          <a
            onClick={_=>onChange({
              ...date,
              month:date.month+1,
              date:1
            })}
            className="datepicker-header-button"
          >
            {' › '}
          </a>
          <a
            onClick={_=>onChange({
              ...date,
              year:date.year+1,
              date:1
            })}
            className="datepicker-header-button"
          >
            {' » '}
          </a>
        </div>
      </div>
      <div className="datepicker-body">
        <table className="datepicker-body-table">
          <thead>
            <tr>
              {dateHead.map((item,index)=><th key={index}>{item}</th>)}
            </tr>
          </thead>
          <tbody>
            {
              datepicker.map((item,row)=>{
                return(
                  <tr key={row}>
                    {
                      item.map((ite,column)=>{
                        return(
                          <td className={ite.classNames} key={column}>
                            <div onClick={_=>onChange(datepicker[row][column])}>
                              {ite.date}
                            </div>
                          </td>
                        )
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <div className="datepicker-footer">
        <div onClick={_=>Reset()} className="datepicker-footer-reset">重置</div>
        <div onClick={_=>Confirm()} className="datepicker-footer-confirm">确定</div>
      </div>
    </>
  )
}
export default Index
