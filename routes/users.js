/*
 * @Descripttion: user模块接口
 * @Author: JayShen
 * @Date: 2021-10-27 17:18:26
 * @LastEditors: JayShen
 * @LastEditTime: 2021-11-11 11:50:29
 */
const router = require('koa-router')()
const useCtl = require("../controller/user")
router.prefix('/users')

// 添加系统用户
router.post('/add', useCtl.userAdd)

// 修改系统用户
router.post('/update', useCtl.userUpdate)

// 删除系统用户
router.post('/del', useCtl.userDel)

// 查询所有系统用户
router.get('/find', useCtl.userFindAll)

// 查询单个系统用户
router.get('/find/:id', useCtl.userFindOne)

// 登录
router.post('/login', useCtl.login)

// 注册
router.post('/reg', useCtl.reg)

// 认证用户
router.post('/verify', useCtl.verify)

module.exports = router
