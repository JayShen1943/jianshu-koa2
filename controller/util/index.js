/*
 * @Descripttion: 控制层方法封装
 * @Author: JayShen
 * @Date: 2021-10-28 10:56:30
 * @LastEditors: JayShen
 * @LastEditTime: 2021-11-11 11:11:08
 */



/**
 * @Description: 查询所有
 * @Author: JayShen
 * @param {*}
 */
const findAll = (model, ctx) => {
    return (
        model.find().then(res => {
            ctx.body = {
                code: 200,
                data: res,
                message: '查询成功'
            }
        }).catch(err => {
            ctx.body = {
                code: 400,
                message: '查询异常：' + err
            }
        })
    )
}


/**
 * @Description: 查询单个
 * @Author: JayShen
 * @param {*}
 */
const findOne = (model, where, ctx) => {
    return (
        model.findOne(where).then(res => {
            ctx.body = {
                code: 200,
                data: res,
                message: '查询成功'
            }
        }).catch(err => {
            ctx.body = {
                code: 400,
                message: '查询异常：' + err
            }
        })
    )
}
/**
 * @Description: 添加
 * @Author: JayShen
 * @param {*}
 */
const add = (model, params, ctx) => (
    model.create(params).then(res => {
        ctx.body = {
            code: 200,
            data: res,
            message: '添加成功'
        }
    }).catch(err => {
        ctx.body = {
            code: 400,
            message: '添加异常：' + err
        }
    })
)

/**
 * @Description: 修改
 * @Author: JayShen
 * @param {*}
 */
const update = (model, where, params, ctx) => (
    model.updateOne(where, params).then(res => {
        ctx.body = {
            code: 200,
            data: res,
            message: '修改成功'
        }
    }).catch(err => {
        console.log(err);
        ctx.body = {
            code: 400,
            message: '修改异常：' + err
        }
    })
)

/**
 * @Description: 删除
 * @Author: JayShen
 * @param {*}
 */
const del = (model, where, ctx) => {
    return (
        model.findOneAndDelete(where).then(res => {
            ctx.body = {
                code: 200,
                data: res,
                message: '删除成功'
            }
        }).catch(err => {
            ctx.body = {
                code: 400,
                message: '删除异常：' + err
            }
        })
    )

}
module.exports = {
    findAll,
    findOne,
    add,
    update,
    del
}