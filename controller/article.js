/*
 * @Descripttion: 文章模块接口
 * @Author: JayShen
 * @Date: 2021-11-23 10:36:19
 * @LastEditors: JayShen
 * @LastEditTime: 2021-11-25 16:32:54
 */
const Article = require('../models/article')
/**
 * 发布文章
 */
const addArticle = async ctx => {
    let article = ctx.request.body
    const rel = await Article.create(article)
    if (rel) {
        ctx.body = {
            code: 200,
            message: "文章发布成功"
        }
    } else {
        ctx.body = {
            code: 300,
            message: "文章发布失败"
        }
    }
}
/**
 * 查询单个文章
 */
const findOne = async ctx => {
    try {
        const { id } = ctx.query
        let isRead = false
        const rel = await Article.findOne({ id })
        if (rel) {
            isRead = true
            ctx.body = {
                code: 200,
                data: rel,
                message: "文章查询成功"
            }
        } else {
            ctx.body = {
                code: 300,
                message: "文章查询失败"
            }
        }
        if (isRead) {
            // 统计文章阅读量 $inc:自增
            await Article.updateOne({ id }, { $inc: { read: 1 } })
        }
    } catch (error) {
        ctx.body = {
            code: 500,
            message: "文章查询异常"
        }
    }
}
/**
 * 文章全部查询(分页)
 */
const findAll = async ctx => {
    try {
        let { page, author } = ctx.query
        // 页码判断
        if (!page || isNaN(Number(page))) {
            page = 1
        } else {
            page = Number(page)
        }
        let pageSize = 10
        let count = 0
        let totalPage = 0
        count = await Article.find({ author }).count()
        if (count > 0) {
            totalPage = Math.ceil(count / pageSize)
        }
        // 判断当前页码的范围
        if (totalPage > 0 && page > totalPage) {
            page = totalPage
        } else if (page < 1) {
            page = 1
        }
        // 计算起始位置
        let start = (page - 1) / pageSize
        const rel = await Article.find({ author }).skip(start).limit(pageSize)
        if (rel && rel.length > 0) {
            ctx.body = {
                code: 200,
                data: rel,
                page,
                pageSize,
                count,
                message: '文章查询成功'
            }
        } else {
            ctx.body = {
                code: 300,
                message: '没有查询到文章'
            }
        }
    } catch (error) {
        ctx.body = {
            code: 500,
            message: '查询文章时出现异常'
        }
    }
}



/**
 * 修改文章
 */
const update = async ctx => {
    let article = ctx.request.body
    const rel = await Article.updateOne({
        id: article.id
    }, {
        title: article.title,
        stemfrom: article.stemfrom,
        content: article.content
    })
    if (rel) {
        if (rel.acknowledged) {
            ctx.body = {
                code: 200,
                message: "文章更新成功"
            }
        } else {
            ctx.body = {
                code: 300,
                message: "文章更新成功"
            }
        }
    }
}
/**
 * 删除文章
 */
const del = async ctx => {
    const { id } = ctx.request.body
    const rel = await Article.findOneAndDelete({ id })
    if (rel) {
        ctx.body = {
            code: 200,
            message: '删除成功'
        }
    } else {
        ctx.body = {
            code: 300,
            message: '删除异常'
        }
    }
}
module.exports = {
    addArticle,
    update,
    findAll,
    findOne,
    del
}