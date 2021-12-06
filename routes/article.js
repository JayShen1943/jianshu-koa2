/*
 * @Descripttion: 文章模块
 * @Author: JayShen
 * @Date: 2021-11-23 14:27:02
 * @LastEditors: JayShen
 * @LastEditTime: 2021-12-01 13:38:25
 */
const { addArticle, update, findAll, findOne, del } = require('../mongoDB/controller/article')
const router = require('koa-router')()
router.prefix('/article')

// 新增文章
router.post('/add', addArticle)

// 更新文章
router.post('/update', update)

// 分页查询文章
router.get('/findAll', findAll)

// 单个查询文章
router.get('/findOne', findOne)

// 删除文章
router.post('/del', del)
module.exports = router