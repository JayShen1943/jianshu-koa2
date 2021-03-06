/*
 * @Descripttion: 
 * @Author: JayShen
 * @Date: 2021-12-06 16:43:55
 * @LastEditors: JayShen
 * @LastEditTime: 2021-12-06 16:52:03
 */

// 自定义时间戳转化时间 yyyy-MM-dd hh:mm:ss
const parseStampToFormat = (timestamp) => {
  const monthEnum = [
    '01', '02', '03', '04', '05', '06',
    '07', '08', '09', '10', '11', '12',
  ]
  const dayEnum = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '04', '25', '26', '27', '28', '29', '30', '31',
  ]
  const timeEnum = [
    '00',
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '04', '25', '26', '27', '28', '29', '30',
    '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
    '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
    '51', '52', '53', '54', '55', '56', '57', '58', '59',
  ]
  let _date = new Date(timestamp * 1);
  let parsedDate = `${_date.getFullYear()}-${monthEnum[_date.getMonth()]}-${dayEnum[_date.getDate() - 1]}`;
  let parseTime = `${timeEnum[_date.getHours()]}:${timeEnum[_date.getMinutes()]}:${timeEnum[_date.getSeconds()]}`;
  let parseDatetime = `${parsedDate} ${parseTime}`;
  return parseDatetime;
}

// 当前时间戳转化 yyyy-MM-dd hh:mm:ss
const getNowDatetime = () => {
  let timestamp = new Date().getTime()
  let nowDatetime = parseStampToFormat(timestamp)
  return nowDatetime
}
module.exports = {
  parseStampToFormat,
  getNowDatetime
}