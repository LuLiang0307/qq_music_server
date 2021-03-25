const HEADERS = {
    'authority': "u.y.qq.com",
    'accept': "application / json",
    'user-agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
    'origin': "https://i.y.qq.com",
    'referer': "https://i.y.qq.com/",
}

const request = require('request-promise');
export default async(req, res) => {
    const { keyword, page = 1 } = req.query
    const url = `https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?_=${+new Date()}&g_tk=5381&uin=&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=${encodeURIComponent(keyword)}&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=${page}&remoteplace=txt.mqq.all`
    try {
        res.json(await request({
            url: url,
            json: true,
            headers: HEADERS
        }))
        res.header("Access-Control-Allow-Origin", "*");

    } catch (e) {
        res.json({ error: e.massage })
    }
}