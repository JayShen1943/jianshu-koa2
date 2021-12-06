/*
 * @Descripttion: 类型验证
 * @Author: JayShen
 * @Date: 2021-12-04 09:55:00
 * @LastEditors: JayShen
 * @LastEditTime: 2021-12-04 11:57:08
 */
const Types = {

    isPrototype(data) {
        return Object.prototype.toString.call(data).toLowerCase()
    },

    isArray(data) {
        return this.isPrototype(data) === '[object array]'
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

module.exports = Types
