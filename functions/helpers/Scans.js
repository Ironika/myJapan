const axios = require('axios');
const cheerio = require('cheerio');
const { isInList, fetchRss } = require('./Shared');
const { SCANTRAD, MANGAFOX } = require('../rss');

async function getScans() {
    let scans = []
    const scantrad = await getScantrad()
    scans = scans.concat(scantrad)
    scans.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
    return scans
}

async function getScansVA() {
    let scansVa = []
    const mangaFox = await getMangaFox()
    scansVa = scansVa.concat(mangaFox)
    return scansVa
}

async function getScantrad() {
    const json = await fetchRss(SCANTRAD)
    const datas = formatJsonScantrad(json)
    return datas
}

async function getMangaFox() {
    let datas = []
    for(let i = 1; i <= 10; i++) {
        const json = await axios.get(MANGAFOX + i + '.html')
        let data = formatJsonMangaFox(json)
        datas = datas.concat(data)
    }

    return datas
}

function formatJsonScantrad(json) {
    let array = []
    const items = json.rss.channel.item
    for(var i = 0; i < items.length; i++) {
        if(isInList(items[i].title['_cdata'].toUpperCase(), 'scans')) {
            let title = items[i].title['_cdata'].replace('Scan - ', '')
            title = title.replace('Chapitre ', '')
            const item = {
                title: title,
                link: items[i].link['_text'],
                pubDate: items[i].pubDate['_text'],
                site: 'Scantrad',
                img: items[i].description['_cdata'].match('src="(https.*.png)')[0].replace('src="', ''),
                lang: 'VF'
            }
            array.push(item)
        }
    }
    return array
}

function formatJsonMangaFox(json) {
    let array = []
    const $ = cheerio.load(json.data)
    const items = $('.manga-list-4-list > li')
    for(let i = 0; i < items.length; i++) {
        let title = $('.manga-list-4-list > li > .manga-list-4-item-title > a')[i].children[0].data
        if(isInList(title.toUpperCase(), 'scans')) {
            const img = $('.manga-list-4-list > li > a > img')[i].attribs.src
            const date = $('.manga-list-4-list > li > .manga-list-4-item-subtitle > span')[i].children[0].data
            const chapt = $('.manga-list-4-list > li > .manga-list-4-item-part > li:first-child > a')[i].children[0].data ? $('.manga-list-4-list > li > .manga-list-4-item-part > li:first-child > a')[i].children[0].data.replace('Ch.', '') : ''
            const link = $('.manga-list-4-list > li > .manga-list-4-item-part > li:first-child > a')[i].attribs.href ? $('.manga-list-4-list > li > .manga-list-4-item-part > li:first-child > a')[i].attribs.href : $('.manga-list-4-list > li > a')[i].attribs.href
            const item = {
                title: title + ' ' + chapt,
                link: 'http://fanfox.net' + link,
                pubDate: date,
                site: 'MangaFox',
                img: img,
                lang: 'VA'
            }
            array.push(item)
        }
    }
    return array
}

module.exports = {
    getScans,
    getScansVA
};