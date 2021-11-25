/*
 * @Descripttion: user模块控制层
 * @Author: JayShen
 * @Date: 2021-10-28 10:30:42
 * @LastEditors: JayShen
 * @LastEditTime: 2021-11-23 10:27:05
 */
const user = require('../models/users')
const crud = require("./util")
let jwt = require('jsonwebtoken')
// 添加系统用户
const userAdd = async (ctx) => {
    let { username = '', pwd = "" } = ctx.request.body
    await crud.add(user, { username: username, pwd: pwd }, ctx)
}

// 修改系统用户
const userUpdate = async (ctx) => {
    let params = ctx.request.body
    await crud.update(user, { _id: params._id }, {
        username: params.username,
        pwd: params.pwd
    }, ctx)

}
// 删除系统用户
const userDel = async (ctx) => {
    let { _id } = ctx.request.body
    await crud.del(user, { _id }, ctx)
}

// 查询所有系统用户
const userFindAll = async (ctx) => {
    await crud.findAll(user, ctx)
}

// 查询单个系统用户
const userFindOne = async (ctx) => {
    await crud.findOne(user, { _id: ctx.params.id }, ctx)
}
// --------------------------以上为demo--------------------------------------
// 登录
const login = async (ctx) => {
    // const rel = await crud.findOne(user, { _id: ctx.params.id }, ctx)
    let { username, pwd } = ctx.request.body
    const rel = await user.findOne({ username, pwd })
    if (rel) {
        let token = jwt.sign({
            username: rel.username,
            _id: rel._id
        }, 'jianshu-server-jwt', { expiresIn: 3600 * 24 * 7 }
        )
        ctx.body = {
            code: 200,
            token,
            message: '登录成功'
        }
    } else {
        ctx.body = {
            code: 300,
            message: '登录失败'
        }
    }
}

// 注册
const reg = async ctx => {
    let { username, pwd } = ctx.request.body
    let isDouble = false
    const rel = await user.findOne({ username })
    if (rel) {
        isDouble = true
    }
    if (isDouble) {
        ctx.body = {
            code: 300,
            message: "用户已存在"
        }
    } else {
        if (!username) {
            ctx.body = {
                code: 300,
                message: '请输入用户名'
            }
            return
        }
        if (!pwd) {
            ctx.body = {
                code: 300,
                message: '请输入密码'
            }
            return
        }
        const res = await user.create({ username, pwd })
        if (res) {
            ctx.body = {
                code: 200,
                message: '注册成功'
            }
        } else {
            ctx.body = {
                code: 300,
                message: '注册失败'
            }
        }
    }
}

/**
 * 验证用户登录
 */
const verify = async ctx => {
    let token = ctx.header.authorization
    token = token.replace('Bearer ', '')
    try {
        let result = jwt.verify(token, 'jianshu-server-jwt')
        const res = await user.findOne({ _id: result._id })
        if (res) {
            ctx.body = {
                code: 200,
                data: res,
                message: '用户认证成功'
            }
        } else {
            ctx.body = {
                code: 300,
                message: '用户认证失败'
            }
        }
    } catch (error) {
        ctx.body = {
            code: 400,
            message: '用户认证异常'
        }
    }
}

/**
 * 修改用户密码
 */
const updatePwd = async ctx => {
    let { username, pwd } = ctx.request.body
    const rel = await user.updateOne({ username }, { pwd })
    if (rel) {
        if (rel.acknowledged) {
            ctx.body = {
                code: 200,
                message: '密码修改成功',
                data: rel
            }
        }
    }
}
/**
 * 修改用户个人信息
 */
const updatePersonal = async ctx => {
    let { _id, avatar = '', sex = "", desc = '', phone = '', email = '' } = ctx.request.body
    const rel = await user.updateOne({
        _id
    }, {
        avatar,
        sex,
        desc,
        phone,
        email
    }
    )
    if (rel) {
        if (rel.acknowledged) {
            ctx.body = {
                code: 200,
                message: '资料已更新',
                data: rel
            }
        } else {
            ctx.body = {
                code: 300,
                message: '资料更新失败',
            }
        }
    }

}
module.exports = {
    userAdd,
    userUpdate,
    userDel,
    userFindAll,
    userFindOne,
    login,
    reg,
    verify,
    updatePwd,
    updatePersonal
}