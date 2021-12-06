/*
 * @Descripttion: 模型对象-用户信息
 * @Author: JayShen
 * @Date: 2021-10-27 17:35:49
 * @LastEditors: JayShen
 * @LastEditTime: 2021-11-23 09:58:39
 */
const mongoose = require('mongoose')

// 系统用户模型对象
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        default: ""
    },
    pwd: {
        type: String,
        default: ""
    },
    // 头像
    avatar: {
        type: String,
        default: ""
    },
    // 性别
    sex: {
        type: String,
        default: ""
    },
    // 描述
    desc: {
        type: String,
        default: ""
    },
    // 电话
    phone: {
        type: String,
        default: ""
    },
    // 邮箱
    email: {
        type: String,
        default: ""
    },
})
const user = mongoose.model('users', userSchema)
module.exports = user