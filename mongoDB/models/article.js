/*
 * @Descripttion: 模型对象-文章模块
 * @Author: JayShen
 * @Date: 2021-11-23 10:27:30
 * @LastEditors: JayShen
 * @LastEditTime: 2021-11-26 14:38:21
 */
const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    id: Number,
    title: String,
    createTime: String,// 发布时间
    content: String,// 内容
    stemfrom: String,// 来源
    read: {
        type: Number,
        default: 0
    },
    star: {
        type: Number,
        default: 0
    },
    comment: {
        type: String,
        default: ""
    },
    author: String
})
const Article = mongoose.model('articles', schema)
module.exports = Article