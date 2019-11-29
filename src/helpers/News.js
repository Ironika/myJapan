
import { ADALA, NAUTIJON, MANGASNEWS } from '../rss';
import adala from '../assets/img/adala.png';
import { fetchRss } from './Shared'

export const getNews = async () => {
    let news = []
    let adala = await getAdalaNews()
    let nautijon = await getNautijonNews()
    let mangasNews = await getMangasNews()

    news = news.concat(adala, nautijon, mangasNews)

    news.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))

    let cache = JSON.parse(sessionStorage.getItem('cache'))
    cache.news = news
    cache.newsDate = new Date()
    sessionStorage.setItem('cache', JSON.stringify(cache))

    return news
}

const getAdalaNews = async () => {
    let json = await fetchRss(ADALA)
    let datas = formatJsonAdala(json)
    return datas
}

const getNautijonNews = async () => {
    let json = await fetchRss(NAUTIJON)
    let datas = formatJsonNautijon(json)
    return datas
}

const getMangasNews = async () => {
    let json = await fetchRss(MANGASNEWS)
    let datas = formatJsonMangasNews(json)
    return datas
}

const formatJsonAdala = (json) => {
    let array = []
    const items = json.rss.channel.item
    for(var i = 0; i < items.length; i++) {
        let item = {
            title: items[i].title['_text'],
            desc: items[i].description['_cdata'],
            link: items[i].link['_text'],
            pubDate: items[i].pubDate['_text'],
            category: items[i].category[0]['_cdata'],
            site: 'Adala-news',
            img: adala
        }
        array.push(item)
    }
    return array
}

const formatJsonNautijon = (json) => {
    let array = []
    const items = json.rss.channel.item
    for(var i = 0; i < items.length; i++) {
        const desc = items[i].description['_cdata'].split('<br />')
        const src = desc[0].match('(https.*.jpg)')
        let item = {
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

const formatJsonMangasNews = (json) => {
    let array = []
    const items = json.rss.channel.item
    for(var i = 0; i < items.length; i++) {
        const desc = items[i].description['_cdata'].split('<p>')
        const src = desc[0].match('(https.*.jpg)')
        let item = {
            title: items[i].title['_text'],
            desc: desc[1].replace('</p>', ''),
            link: items[i].link['_text'],
            pubDate: items[i].pubDate['_text'],
            site: 'Mangas-News',
            img: src[0]
        }
        array.push(item)
    }
    return array
}