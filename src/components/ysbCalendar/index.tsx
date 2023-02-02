import Icon from "@src/component/Icon";
import { FC, useEffect, useRef, useState } from "react";
import YsbModal from "../ysbModal/YsbModal";
import {weekDay, basic} from './weekDay'
import './index.less'
import useClickOutside from "@src/hooks/useClickOutSide";
type ICalendarDate = Record< "year" | "month" | "day", number >

interface IYsbCalendarProps {
    show: boolean,
    onClose: ()=>void,
    defaultDate: ICalendarDate
}

type IProps = Partial<IYsbCalendarProps>

const YsbCalendar: FC<IProps> = (props) => {
  const {
      defaultDate
  } = props
  const [open, setOpen] = useState(false)
  const [showDate, setShowDate] = useState<any>([]);
  const [select, setSelect] = useState<ICalendarDate>({ ...basic });
  const date = useRef<ICalendarDate>({ ...basic });
  const blurRef = useRef(null)
  const mainRef = useRef(null)

  useEffect(() => {
    Day(basic.year, basic.month, basic.day);
  }, [])

  useEffect(() => {
    if( !defaultDate) return
    date.current = { ...defaultDate };
    Day(date.current.year, date.current.month, date.current.day);
  }, [ defaultDate])

  const handleChangeDate = (val: number) => {
      date.current = { year: select.year, month: select.month, day: val };
      setSelect({ year: select.year, month: select.month, day: val });
      Day(select.year, select.month, val);
  };

  const Day = (year: number, month: number, day: number) => {
      let total;
      if (month !== 2) {
          if (month === 4 || month === 6 || month === 9 || month === 11) {
              total = 30;
          } else {
              total = 31;
          }
      } else {
          //判断是否是闰年
          if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
              total = 29;
          } else {
              total = 28;
          }
      }
      let firstday = new Date(year, month - 1, 1);
      let week = firstday.getDay();
      let dom = [];

      if (week !== 0) {
          for (let i = 0; i < week; i++) {
              dom.push('');
          }
      }

      for (let j = 1; j <= total; j++) {
          let check = false;
          if (year === date.current.year && month === date.current.month && j === date.current.day) {
              check = true;
          }
          dom.push({ label: j, check: check });
      }
      setShowDate(dom);
  };

  const handleClose = (e?: any) => {
      e?.stopPropagation() // 阻止冒泡
      setOpen(false)
  }

  useClickOutside([blurRef, mainRef], ()=>{
    handleClose()
  })

  // 上月
  const handlePrev = () => {
      // let month = select.month;
      // let year = select.year;
      // let day = select.day;
      // if (Number(select.month) > 1) {
      //     month = select.month - 1;
      //     year = select.year;
      // }
      // if (Number(select.month) === 1) {
      //     month = 12;
      //     year = select.year - 1;
      // }
      // setSelect({ year: year, month: month, day: day });
      // Day(year, month, day);
  };

  // 下月
  const handleNext = () => {
      // let month = select.month;
      // let year = select.year;
      // let day = select.day;
      // if (select.month < 12) {
      //     month = Number(select.month) + 1;
      //     year = select.year;
      // }
      // if (select.month == 12) {
      //     month = 1;
      //     year = Number(select.year) + 1;
      // }
      // setSelect({ year: year, month: month, day: day });
      // Day(year, month, day);
  };

  return (
      <div  className="acalendar">
        <div
          ref={mainRef}
          onClick={()=>{setOpen(true)}}
          className="calendar-info w161"
          style={{}}
        >
          <Icon icon='icon-rili' className='pl8'/>
          <span className='ysb-ellipsis w109'> 2022-09-22 </span>
          <Icon icon='icon-sanjiaoxing'/>
        </div>

        <YsbModal ref={blurRef} visible={open} onClose={()=>{setOpen(false)}}>
          <div className="calendar-content">
            <div className="calendar-bar">
              <div
                  className="close"
                  onClick={handleClose}
              >
                取消
              </div>
              <div className="bar-left"> {select.year}年</div>
              <div className="bar-right">
                <Icon icon='icon-fangxiang-xiangzuo' onClick={handlePrev} />
                <span className="showtext">{select.month}月</span>
                <Icon icon="icon-fangxiang-xiangyou" onClick={handleNext} />
              </div>
              <div
                className="close"
                onClick={(e)=>{handleClose(e)}}
              >
                确认
              </div>
            </div>
            <div className="calendar-data-content">
              {weekDay.map((item) => {
                return (
                  <li className="everyday" key={item.value}>
                      {item.label}
                  </li>
                );
              })}
              {showDate &&
                showDate.map((item: any, index: number) => {
                  return (
                    <div key={index} className="everyday" onClick={() => handleChangeDate(item.label)}>
                      <span className={`everyday-text ${item.check ? 'check' : ''}`}>{item.label}</span>
                    </div>
                  );
              })}
              </div>
            </div>
        </YsbModal>
      </div>
  )
}

export default YsbCalendar