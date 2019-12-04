# Calender 日历
> js原生手写日历组件

## 关键步骤
1. 计算设定月第一天是星期几
2. 计算的设定月上一个月和下一个月的年份和月份
3. 计算设定月和上一个月的最后一天是几号
```js
    // 设定的年月
    let year=2019;
    let month=12;
    //这个月的第一天星期几
    let themonth1stday = (new Date(year, month - 1, 1)).getDay() === 0 ? 7 : (new Date(year, month - 1,
        1)).getDay() + 1;

    //下一个月的年月
    let y = month == 12 ? year + 1 : year; //下一月所在的年
    let m = month == 12 ? 1 : month; //下一个月

    //上一个月的年月
    let _y = month == 1 ? year - 1 : year; //上一月所在的年
    let _m = month == 1 ? 12 : month - 1; //上一个月

    //本月的最后一天是几号
    let themonthdaysamount = new Date(new Date(y, m, 1) - 1).getDate() //日期对象减去常数表示得到时间戳。减去1表示减去1毫秒。
    //上月的最后一天是几号
    let prevmonthlastdate = new Date(new Date(year, month - 1, 1) - 1).getDate();
```