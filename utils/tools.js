/*
 * @Descripttion: 函数工具
 * @Author: JayShen
 * @Date: 2021-12-06 15:38:52
 * @LastEditors: JayShen
 * @LastEditTime: 2021-12-06 16:46:45
 */

const UUID = require('uuid');
const MD5 = require('md5')
// 随机生成32位id
const generateId = () => {
    return MD5(UUID.v1());
}
// 类型判断
const Types = {

    isPrototype(data) {
        return Object.prototype.toString.call(data).toLowerCase()
    },

    isArray(data) {
        return this.isPrototype(data) === '[object array]'
    },
    isArrayLg(data) {
        if ((this.isPrototype(data) === '[object array]') && data.length > 0) {
            return true
        }
        return false
    },
    isJSON(data) {
        return this.isPrototype(data) === '[object object]'
    },

    isFunction(data) {
        return this.isPrototype(data) === '[object function]'
    },

    isString(data) {
        return this.isPrototype(data) === '[object string]'
    },

    isNumber(data) {
        return this.isPrototype(data) === '[object number]'
    },

    isUndefined(data) {
        return this.isPrototype(data) === '[object undefined]'
    },

    isNull(data) {
        return this.isPrototype(data) === '[object null]'
    }

}
module.exports = {
    generateId,
    Types,
}