const { fetchRss } = require('./Shared');
const { ADALA, NAUTIJON, MANGASNEWS } = require('../rss');

async function getNews() {
    let news = []
    const adala = await getAdalaNews()
    const nautijon = await getNautijonNews()
    const mangasNews = await getMangasNews()

    news = news.concat(adala, nautijon, mangasNews)

    news.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))

    return news
}

async function getAdalaNews() {
    const json = await fetchRss(ADALA)
    const datas = formatJsonAdala(json)
    return datas
}

async function getNautijonNews() {
    const json = await fetchRss(NAUTIJON)
    const datas = formatJsonNautijon(json)
    return datas
}

async function getMangasNews() {
    const json = await fetchRss(MANGASNEWS)
    const datas = formatJsonMangasNews(json)
    return datas
}

function formatJsonAdala(json) {
    let array = []
    const items = json.rss.channel.item
    for(var i = 0; i < items.length; i++) {
        const item = {
            title: items[i].title['_text'],
            desc: items[i].description['_cdata'],
            link: items[i].link['_text'],
            pubDate: items[i].pubDate['_text'],
            category: items[i].category[0]['_cdata'],
            site: 'Adala-news',
            img: null
        }
        array.push(item)
    }
    return array
}

function formatJsonNautijon(json) {
    let array = []
    const items = json.rss.channel.item
    for(var i = 0; i < items.length; i++) {
        const desc = items[i].description['_cdata'].split('<br />')
        const src = desc[0].match('(https.*.jpg)')
        const item = {
            title: items[i].title['_text'],
            desc: desc[1],
            link: items[i].link['_text'],
            pubDate: items[i].pubDate['_text'],
            site: 'Nautijon',
            img: src[0]
        }
        array.push(item)
    }
    return array
}

function formatJsonMangasNews(json) {
    let array = []
    const items = json.rss.channel.item
    for(var i = 0; i < items.length; i++) {
        const desc = items[i].description['_cdata'].split('<p>')
        const src = desc[0].match('(https.*.jpg)')
        const item = {
            title: items[i].title['_text'],
            desc: desc[1].replace('</p>', ''),
            link: items[i].link['_text'],
            pubDate: items[i].pubDate['_text'],
            site: 'Mangas-News',
            img: src ? src[0] : null
        }
        array.push(item)
    }
    return array
}


module.exports = getNews;