/*
 * @Descripttion: 模型对象
 * @Author: JayShen
 * @Date: 2021-10-27 17:35:49
 * @LastEditors: JayShen
 * @LastEditTime: 2021-11-11 10:33:55
 */
const mongoose = require('mongoose')

// 系统用户模型对象
const userSchema = new mongoose.Schema({
    username: String,
    pwd: String,
})
const user = mongoose.model('users', userSchema)
module.exports = {
    user
}