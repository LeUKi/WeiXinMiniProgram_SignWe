// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  // const a = await db.collection('chairs').
  // where({
  //   _id: 'notic',
  // }).update({
  //   data: {
  //     notice: {
  //       "background": "#F0F3F6", //公告栏背景颜色
  //       "color": "#1989fa", //公告字体颜色
  //       "icon": "volume-o", //公告图标，见vant框架
  //       "text": "学技术就是要坐冷板凳" //公告文本
  //     }
  //   }
  // })
  function getPlan() {
    const max = 2; //安排一天要打扫实验室的人数
    const arr = [
        "邱德生",  "吴东骏" , "林艺倍", "梁业建", "陈龙祥",
        "刘维睿",  "李金鹏",
         "颜昭琰","罗振羽",
       "温芳芳",         "陈慧琳", "李春江", "曾彬翔",
      "徐国源","陈双龙", "赖宇康", "吴文耀", 
       "杨天鸿", "陈嘉龙",
        "李泽恒",
    ]
    const length = arr.length;  // 实验室的总人数
  
    //展示的列表的长度。 所有人都安排上，长度至少为一周
    const listLength = ((length ) % max == 0 ? (length / max) : parseInt((length / max)) + 1) >= 7 ? ((length ) % max == 0 ? (length / max) : parseInt((length / max)) + 1) : 7;
    // const listLength = 7;
    console.log(listLength);
    function timeFn(d1) { //di作为一个变量传进来
      //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
      var dateBegin = new Date(d1.replace(/-/g, "/")); //将-转化为/，使用new Date
      var dateEnd = new Date(); //获取当前时间
      var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
      var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
      var leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
      var hours = Math.floor(leave1 / (3600 * 1000)) //计算出小时数
      //计算相差分钟数
      var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
      var minutes = Math.floor(leave2 / (60 * 1000)) //计算相差分钟数
      //计算相差秒数
      var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
      var seconds = Math.round(leave3 / 1000)
      // console.log(" 相差 " + dayDiff + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒")
      // console.log(dateDiff + "时间差的毫秒数", dayDiff + "计算出相差天数", leave1 + "计算天数后剩余的毫秒数"
      // , hours + "计算出小时数", minutes + "计算相差分钟数", seconds + "计算相差秒数");
      // console.log(dayDiff);
      return dayDiff;
    }
  
    // console.log(tuArr);
    function AddDays(num) {
      var newdate = new Date();
      var newtimems = newdate.getTime() + (num * 24 * 60 * 60 * 1000);
      newdate.setTime(newtimems);
      var time = newdate.getFullYear() + "-" + (newdate.getMonth() + 1) + "-" + newdate.getDate();
      return time;
    };
    // console.log(AddDays(1))
  
    // console.log(todayArr);
  
  
  
    const t3 = "2021-4-9 00:00:00";
    let dayD = timeFn(t3);
  
    let todayArr = [];
    let tuArr = [];
    let i, j, init = 0;
    for (let i = 0; i < dayD + listLength; i++) {
      let obj = {
        arr: [],
        date: ''
      };
      if (i >= dayD) {
        for (j = 0; j < max; j++) {
          obj.arr.push(arr[(init++) % length]);
        }
        obj.date = AddDays((i-dayD));
        tuArr.push(obj);
      } else {
        init = (init + 1) % length;
        init = (init + 1) % length;
      }
    }
  
    console.log(tuArr); //整个扫地安排
    return tuArr;
  }
  var plan = getPlan(); //调用getPlan 函数
  const a = await db.collection('chairs').
  where({
    _id: 'notic',
  }).update({
    data: {
      steps: [{
          text: '今天',
          desc: plan[0].arr[0] +"和" +plan[0].arr[1] ,
        },
        {
          text: '明天',
          desc: plan[1].arr[0] +"和" +plan[1].arr[1] ,
        },
        {
          text: plan[2].date,
          desc: plan[2].arr[0] +"和" +plan[2].arr[1] ,
        },
        {
          text: plan[3].date,
          desc: plan[3].arr[0] +"和" +plan[3].arr[1] ,
        },
        {
          text: plan[4].date,
          desc: plan[4].arr[0] +"和" +plan[4].arr[1] ,
        },
        {
          text: plan[5].date,
          desc: plan[5].arr[0] +"和" +plan[5].arr[1] ,
        },
        {
          text: plan[6].date,
          desc: plan[6].arr[0] +"和" +plan[6].arr[1] ,
        },
        {
          text: "0点自动生成",
          desc: "扫地、拖地，晚上一定要倒垃圾，两人自由分配工作。",
        },
      ],
      notice: {
        "background": "#fffbe8", //公告栏背景颜色
        "color": "#f22613", //公告字体颜色
        "icon": "smile-o", //公告图标，见vant框架
        "text": "今日清洁：" + plan[0].arr[0] +"和" + plan[0].arr[1]+ "" //公告文本
      },
      notice2: `<div style="display: flex;align-items: center;flex-direction: column;">
      <div>
        <a style="color: red;"></a>
      </div>
      <div style="display: flex;align-items: flex-start;justify-content:space-around;">
        <img style="width:100%;" alt="这里应该有张图片" src="https://i.loli.net/2021/04/11/2GNtqX4IpkK3cvE.png" />
      </div>
      <div>
      </div>
      </div>`
    }
  })

  return a
}