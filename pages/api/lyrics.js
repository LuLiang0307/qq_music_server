const HEADERS = {
    'authority': "u.y.qq.com",
    'accept': "application / json",
    'user-agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
    'origin': "https://i.y.qq.com",
    'referer': "https://i.y.qq.com/",
}

const request = require('request-promise');

export default async(req, res) => {
    let { id, type = 0 } = req.query
    const url = `https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg?g_tk=1775699468&uin=2313970630&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&g_tk_new_20200303=1775699468&nobase64=1&musicid=${id}&songtype=${type}&_=${+ new Date()}`
    try {
        let text = (await request({
            url: url,
            json: true,
            headers: HEADERS
        })).replace(/MusicJsonCallback\((.*)\)/, '$1')
        res.json(JSON.parse(text))
        res.header("Access-Control-Allow-Origin", "*");

    } catch (e) {
        res.json({ error: e.massage })
    }
}