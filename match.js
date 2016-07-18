#!/usr/bin/env node

'use strict'
const cheerio = require('cheerio');
const request = require('superagent');
const url = require('url');
const fs = require('fs');
const opn = require('opn');
const config = require('./config.json')
//.j-img
module.exports = (paramurl,callback) => {
    //歌
    //原始:http://music.163.com/#/song?id=4386589&userid=57694400
    //http://music.163.com/song?id=4386589&userid=57694400
    //歌单
    //http://music.163.com/#/m/playlist?id=414547231&userid=57694400
    //http://music.163.com/playlist?id=414547231&userid=57694400

    const pageurl = handleparamUrl(paramurl);
    request.get(pageurl)
        .end((err, res) => {
            if (err) {
                console.log('获取网页失败');
                process.exit(1);
            } else {
                const $ = cheerio.load(res.text);
                const photoName = getMusicInfo($);
                let imgurl = $('.j-img').attr('src');
                //imgurl=url.format(((url.parse(imgurl)).search=''));
                imgurl = url.parse(imgurl) //去掉图像大小的请求参数
                imgurl.search = '';
                imgurl = url.format(imgurl);
                const extName = imgurl.substr(imgurl.lastIndexOf('.'));
                const req = request.get(imgurl);
                const fileName=photoName + extName
                req.pipe(fs.createWriteStream(config.path+fileName));
                callback(fileName);

            }
        });

}



let handleparamUrl = (paramurl) => {
    let parseurl = url.parse(paramurl);
    if (parseurl.host != 'music.163.com') {
        console.log("这不是一个有效的专辑网址");
        process.exit(500);
    }
    let hash = parseurl.hash.split('/');
    return parseurl.host + '/' + hash[hash.length - 1];
}

// <div class="tit">
// <em class="f-ff2">湫兮如风</em>
// <a title="播放mv" href="/mv?id=5342246"><i class="icn u-icn u-icn-2"></i></a>
// <div class="subtit f-fs1 f-ff2">电影《大鱼海棠》片尾曲</div>
// </div>
let getMusicInfo = ($) => {
    //歌手$('p.des:nth-child(2) > span:nth-child(1)')
    //歌单.name > a:nth-child(1)
    return $('.tit>.f-ff2').text();


}
