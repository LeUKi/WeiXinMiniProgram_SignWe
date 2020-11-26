# SignWe-图灵实验室自习打卡小程序
## 这是什么
> 一个实验室打卡小程序，是我开发的第一个小程序，使用云函数和vant框架开发。微信搜索"signwe"即可体验。
- 云端修改座位数量
- 云端修改公告栏文字与样式
- 云端添加管理员
- 管理员可重置指定座位
- 每日定时重置所有座位
- 昨日排行榜统计
- 所有人排行榜统计
- 实时查看座位情况
- 小程序码扫码打卡
- 小程序码支持范围内定位打卡与无视范围打卡两种模式

## 如何适配
### 数据库
- 数据库添加集合:```chairs```,```check```
- chairs集合添加记录:```_id:chairs```,```_id:openid```,```_id:yesterday```,```_id:notic```
- chairs集合的_id:chairs记录添加字段:```chairs:[true,true,...]```长度为座位数量
- chairs集合的_id:openid记录添加字段:```openid:[null,null,...]```长度为座位数量
- chairs集合的_id:yesterday记录添加字段:```yesterday:[]```
- chairs集合的_id:notic记录添加字段:
```javascript
notice:{
  "background":"#F0F3F6",//公告栏背景颜色
  "color":"#1989fa",//公告字体颜色
  "icon":"volume-o",//公告图标，见vant框架
  "text":"学技术就是要坐冷板凳"//公告文本
}
```

### 云函数
- "goodboy"-line13:
```javascript
for (let i = 0; i < ???; i++) {
//???修改为座位数量
```
- "goodboy"-触发器:
```json
"config": "0 30 23 * * * *"//每日重置时间
```
- "isOP"-line9:
```javascript
const op = [
    "o8Mur5QAncbRzYbDj05yRhD_VRo4",
    ...//管理员的openid
  ]
```
### 小程序pages
- "index"-line12:
```javascript
circles: [{
      latitude: 21.15204729309082,//定位中心经纬度
      longitude: 110.302223046875,//定位中心经纬度
      radius: 80,//打卡范围半径
      }]
```
### 小程序码
第三方平台生成小程序码：https://cli.im/mina
```
生成格式：
无范围：
  页面路径:/pages/check/check
  页面参数:?chair=****&noDistence=****
  noDistence参数值随意
有范围：
  页面路径:/pages/check/check
  页面参数:?chair=****
```

