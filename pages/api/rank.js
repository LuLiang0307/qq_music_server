const cors = require('cors');
const express = require('express');
const app = express()
const HEADERS = {
    'authority': "u.y.qq.com",
    'accept': "application / json",
    'user-agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
    'origin': "https://i.y.qq.com",
    'referer': "https://i.y.qq.com/",

}
app.use(cors())
    // 解决跨域问题
app.all("/*", function(req, res, next) {
    // 跨域处理
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next(); // 执行下一个路由
})
const request = require('request-promise');

export default async(req, res) => {
    const url = `https://u.y.qq.com/cgi-bin/musicu.fcg?_=${+new Date()}&data={"comm":{"g_tk":1775699468,"uin":2313970630,"format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1,"ct":23,"cv":0},"topList":{"module":"musicToplist.ToplistInfoServer","method":"GetAll","param":{}}}`
    try {
        res.json(await request({
            url: url,
            json: true,
            headers: HEADERS
        }))
    } catch (e) {
        res.json({ error: e.massage })
    }
}