export function formatDate(now) {
  const time = new Date(now.projDate)
  var year = time.getFullYear();  //取得4位数的年份
  var month = time.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
  var date = time.getDate();      //返回日期月份中的天数（1到31）
  var hour = time.getHours();     //返回日期中的小时数（0到23）
  return year + "-" + month + "-" + date
}