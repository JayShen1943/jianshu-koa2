/*
 * @Descripttion: 通用接口返回中间件
 * @Author: JayShen
 * @Date: 2021-11-26 10:46:33
 * @LastEditors: JayShen
 * @LastEditTime: 2021-12-06 16:22:06
 */
function routerResponse(option = {}) {
    return async function (ctx, next) {
        // 成功
        ctx.success = function (data, msg) {
            ctx.type = option.type || 'json'
            ctx.body = {
                code: option.successCode || 200,
                message: msg || 'success',
                data: data || undefined
            }
        }
        // 失败 or 错误
        ctx.fail = function (code, msg) {
            ctx.type = option.type || 'json'
            ctx.body = {
                code: code || option.failCode || 99,
                message: msg || option.successMsg || 'fail',
            }
        }
        await next()
    }

}


module.exports = routerResponse