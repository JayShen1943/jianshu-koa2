/*
 * @Descripttion: 上传接口
 * @Author: JayShen
 * @Date: 2021-11-22 13:57:48
 * @LastEditors: JayShen
 * @LastEditTime: 2021-11-22 16:15:57
 */
const fs = require('fs')
const path = require('path')
const router = require('koa-router')()
router.prefix('/upload')
const multer = require('koa-multer')

let storage = multer.diskStorage({
    // 设置文件存储位置
    destination: function (req, file, cb) {
        let dir = "./public/uploads"
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {
                //  指明是否全部子目录应该被监视，或只是当前目录。 适用于当一个目录被指定时，且只在支持的平台。默认为false
                recursive: true,
            })
        }
        cb(null, dir)
    },
    // 设置文件名称
    filename: function (req, file, cb) {
        let filename = Date.now() + "." + file.originalname
        cb(null, filename)
    }

})

let upload = multer({ storage: storage });
// 上传文件
router.post('/img', upload.single('myfile'), async ctx => {
    let path = ctx.req.file.path
    path = ctx.origin + "" + path.replace('public', '')
    ctx.body = {
        code: 200,
        data: path,
        fileData: ctx.req.file,
    }
})



module.exports = router