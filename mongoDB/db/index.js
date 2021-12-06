/*
 * @Descripttion: 连接 MongoDB数据库
 * @Author: JayShen
 * @Date: 2021-10-27 17:20:02
 * @LastEditors: JayShen
 * @LastEditTime: 2021-12-06 17:52:20
 */
const mongoose = require('mongoose')

module.exports = () => {
    /**
     * MongoDb连接 (useNewUrlParser自动创建新集合)
     */
    mongoose.connect('mongodb://localhost:27017/jianshu', { useunifiedtopology: true, useNewUrlParser: true })
        .then(() => {
            console.log('MongoDB数据库连接成功');
        }).catch(err => {
            console.log('MongoDB数据库连接失败:', err
            );
        })
}