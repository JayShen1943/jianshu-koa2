/*
 * @Descripttion: user模块接口
 * @Author: JayShen
 * @Date: 2021-10-27 17:18:26
 * @LastEditors: JayShen
 * @LastEditTime: 2021-12-09 16:35:09
 */
const router = require('koa-router')()
const useCtl = require("../mongoDB/controller/user")
const userFun = require("../mysql/controller/user")
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
// --------------------------以上为demo--------------------------------------
// 登录
// router.post('/login', useCtl.login)

// // 注册
// router.post('/reg', useCtl.reg)

// // 认证用户
// router.post('/verify', useCtl.verify)

// // 修改密码
// router.post('/update/pwd', useCtl.updatePwd)

// router.post('/update/personal', useCtl.updatePersonal)
// ---------------------以上为mongoDB----------------------------
// 注册
router.post('/regUser', userFun.regUser)

// 登录
router.post('/loginUser', userFun.loginUser)

// 修改密码
router.post('/update/pwd', userFun.updatePwd)

// 修改用户个人信息
router.post('/update/personal', userFun.updatePersonal)

// 修改用户个人信息
router.post('/del/personal', userFun.delPersonal)

module.exports = router

