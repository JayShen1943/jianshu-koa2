/*
 * @Descripttion: 连接mySql和 增删查改函数(防注入)
 * @Author: JayShen
 * @Date: 2021-11-27 10:48:26
 * @LastEditors: JayShen
 * @LastEditTime: 2021-12-09 16:29:25
 */
var config = require('./mysqlConfig');
const mysql = require('mysql');
// 连接池
const pool = mysql.createPool({
    host: config.database.HOST,// 数据库地址
    port: config.database.PORT,// mySql运行的端口号(默认3306)
    database: config.database.DATABASE, // 选中数据库
    user: config.database.USERNAME, // 数据库用户
    password: config.database.PASSWORD // 数据库密码
})
const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)

                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}

// 创建表
const createTable = (sql) => {
    return query(sql, [])
}

/**
 * 根据id查询
 * @param {*} table 表名
 * @param {*} id id
 * @returns list
 */
const findDataById = (table, id) => {
    const _sql = "SELECT * FROM ?? WHERE id = ? "
    return query(_sql, [table, id])
}

// 查询分页
const findDataByPage = (keys, table, start, end) => {
    const _sql = "SELECT ?? FROM ?? LIMTI ? , ?"
    return query(_sql, [keys, table, start, end])
}

/**
 * 插入数据
 * @param {*} table 表名
 * @param {*} values 插入的值
 * @returns list
 */
const insertData = (table, values) => {
    const _sql = `INSERT INTO ?? SET ?`
    return query(_sql, [table, values])
}

/**
 * 更新数据
 * @param {*} table 表名
 * @param {*} values 插入的值
 * @param {*} word 查询条件的值 
 * @param {*} key 查询条件的Key
 * @returns list
 */
const updateData = (table, values, word, key = 'id') => {
    const _sql = `UPDATE ?? SET ? WHERE ${key} =? `
    return query(_sql, [table, values, word])
}

/**
 * 删除数据
 * @param {*} table 表名
 * @param {*} word 查询条件的值
 * @param {*} key 查询条件的Key
 * @returns 
 */
const deleteData = (table, word, key = "id") => {
    const _sql = `DELETE FROM ?? WHERE ${key} =?`
    return query(_sql, [table, word])
}

// 自定义查询
const select = (keys, table) => {
    const _sql = "SELECT ?? FROM ??"
    return query(_sql, [keys, table])
}

// 统计数量
const count = (keys, table) => {
    const _sql = "SELECT COUNT(*) AS ? FROM ??"
    return query(_sql, [keys, table])
}
module.exports = {
    query,
    createTable,
    findDataById,
    findDataByPage,
    insertData,
    updateData,
    deleteData,
    select,
    count
}
