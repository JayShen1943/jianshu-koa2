/*
 * @Descripttion: 模型对象-文章评论模块
 * @Author: JayShen
 * @Date: 2021-11-26 10:25:09
 * @LastEditors: JayShen
 * @LastEditTime: 2021-11-26 10:50:53
 */
let mongoose = require('mongoose')
// 文章评论文档对象
let schema = new mongoose.Schema({
    username: {
        type: String,
        default: ""
    },
    author: {
        type: String,
        default: ""
    },
    articleTitle: {
        type: String,
        default: ""
    },
    articleId: Number,
    content: {
        type: String,
        default: ""
    },
    createTime: {
        type: String,
        default: ""
    },
})
const Comment = mongoose.model('comments', schema)
module.exports = Comment