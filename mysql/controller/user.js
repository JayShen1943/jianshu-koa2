/*
 * @Descripttion: mySql控制层
 * @Author: JayShen
 * @Date: 2021-12-04 11:52:35
 * @LastEditors: JayShen
 * @LastEditTime: 2021-12-09 16:55:47
 */
const mySqlFun = require("../../mysql/db")
let jwt = require('jsonwebtoken')
const { generateId, Types } = require("../../utils/tools")
const { getNowDatetime } = require("../../utils/datetime")
/**
 * 查询用户
 */
const findUser = async ctx => {
    const { id, username } = ctx.query
    let _sql = `
    SELECT * from user_info
      where id="${id}" or username="${username}"
      limit 1`
    let result = await mySqlFun.query(_sql)
    if (Types.isArrayLg(result)) {
        ctx.success(result[0], '用户查询成功')
    } else {
        result = null
        ctx.fail(300, '查询失败')
    }

}

/**
 * 用户注册
 */
const regUser = async ctx => {
    const { telephone, password, username } = ctx.request.body
    const _sql = `SELECT * FROM user_info WHERE telephone=?`
    const rel = await mySqlFun.query(_sql, [telephone])
    if (Types.isArrayLg(rel)) {
        ctx.fail(300, '账号已存在')
    } else {
        if (!telephone) {
            ctx.fail(300, '请输入手机号')
            return
        }
        if (!password) {
            ctx.fail(300, '请输入密码')
            return
        }
        const obj = {
            username: username || '用户' + telephone,
            telephone: telephone,
            password: password,
            insert_time: getNowDatetime(),
            id: generateId()
        }
        const res = await mySqlFun.insertData('user_info', obj)
        if (res.affectedRows) {
            ctx.success(res, '注册成功')
        }
    }
}

/**
 * 用户登录
 */
const loginUser = async (ctx) => {
    const { telephone, password } = ctx.request.body
    if (!telephone) {
        ctx.fail(300, '请输入手机号')
        return
    }
    if (!password) {
        ctx.fail(300, '请输入密码')
        return
    }
    const firstRel = await mySqlFun.query(`SELECT * FROM user_info WHERE telephone=?`, [telephone])
    if (Types.isArrayLg(firstRel)) {
        const rel = await mySqlFun.query(`SELECT * FROM user_info WHERE password=? and telephone=?`, [password, telephone])
        if (Types.isArrayLg(rel)) {
            const relData = rel[0]
            const { password, id, ...result } = relData
            const token = jwt.sign({
                telephone: relData.telephone,
                username: relData.username,
                id: id
            }, 'jianshu-server-jwt', { expiresIn: 3600 * 24 * 7 }// 过期时间7天
            )

            const data = { ...result, token: token }
            ctx.success(data, '登录成功')
        } else {
            ctx.fail(300, '用户密码错误')
        }
    } else {
        ctx.fail(300, '用户未注册')
    }

}

/**
 * 修改用户密码
 */
const updatePwd = async ctx => {
    const { oldPwd, newPwd, confirmPwd } = ctx.request.body
    let token = ctx.header.authorization
    token = token.replace('Bearer ', '')
    const result = jwt.verify(token, 'jianshu-server-jwt')
    if (!oldPwd) {
        ctx.fail(300, '请输入旧密码')
        return
    }
    if (!newPwd) {
        ctx.fail(300, '请输入新密码')
        return
    }
    if (newPwd !== confirmPwd) {
        ctx.fail(300, '两次密码输入不同')
        return
    }
    const verify = await mySqlFun.findDataById(`user_info`, [result.id])
    if (Types.isArrayLg(verify)) {
        if (verify[0].password === oldPwd) {
            const obj = {
                password: confirmPwd,
            }
            const rel = await mySqlFun.query(`UPDATE user_info SET ? WHERE id = ?`, [obj, result.id])
            if (rel.affectedRows) {
                ctx.success('', '密码修改成功')
            }
        } else {
            ctx.fail(300, '旧密码错误')
        }
    }

}

/**
 * 修改用户个人信息
 */
const updatePersonal = async ctx => {
    const { username = "", avatar = '', gender = "", age = '', email = '' } = ctx.request.body
    let token = ctx.header.authorization
    token = token.replace('Bearer ', '')
    const tokenData = jwt.verify(token, 'jianshu-server-jwt')
    const verify = await mySqlFun.findDataById(`user_info`, [tokenData.id])
    if (Types.isArrayLg(verify)) {
        if (!username) {
            ctx.fail(300, '请输入用户名')
            return
        }
        if (!avatar) {
            ctx.fail(300, '请上传头像')
            return
        }
        if (!gender) {
            ctx.fail(300, '请选择性别')
            return
        }
        if (!age) {
            ctx.fail(300, '请输入年龄')
            return
        }
        if (!email) {
            ctx.fail(300, '请输入邮箱')
            return
        }
        const obj = {
            username: username,
            avatar: avatar,
            gender: gender,
            age: age,
            email: email
        }
        const rel = await mySqlFun.updateData('user_info', obj, tokenData.id)
        ctx.success(rel, '用户信息修改成功')
        if (rel.affectedRows) {
            ctx.success('', '用户信息修改成功')
        } else {
            ctx.fail(300, '用户信息修改失败')
        }
    }

}
/**
 * 删除用户
 */
const delPersonal = async (ctx) => {
    const { id } = ctx.request.body
    if (!id) {
        ctx.fail(300, '请选择用户')
        return
    }
    const rel = await mySqlFun.deleteData('user_info', id)
    if (rel.affectedRows) {
        ctx.success('', '用户删除成功')
    } else {
        ctx.fail(300, '用户删除失败')
    }
}
module.exports = { findUser, regUser, loginUser, updatePwd, updatePersonal, delPersonal }