/*
 * @Author: LZY
 * @Date: 2020-07-03 14:34:02
 * @Last Modified by: LZY
 * @Last Modified time: 2020-07-03 14:42:36
 * @description:    error 404 路由
 */
const router = require('koa-router')()

/**
 * error页面
 */
router.get('/error',async (ctx,next)=>{
    await ctx.render('error')
})

/**
 * 404 页面     *代表没有访问到任何路由时就走这个路由，所以在app.js注册路由时，需要放在最下面
 */
router.get('*',async (ctx,next)=>{
    await ctx.render('404')
})

module.exports = router