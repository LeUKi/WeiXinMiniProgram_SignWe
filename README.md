# SignWe-图灵实验室自习打卡小程序
## 这是什么
一个实验室打卡小程序，是我开发的第一个小程序，使用云函数和vant框架开发。

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
