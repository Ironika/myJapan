import axios from 'axios';
var convert = require('xml-js');
import { ADALA, NAUTIJON } from '../rss'
import adala from '../assets/img/adala.png'

export const getNews = async () => {
    let news = []
    let adala = await getAdalaNews()
    let nautijon = await getNautijonNews()

    news = news.concat(adala, nautijon)

    news.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))

    return news
}

export const getAdalaNews = async () => {
    let json = await fetchRss(ADALA)
    let datas = formatJsonAdala(json)
    return datas
}

export const getNautijonNews = async () => {
    let json = await fetchRss(NAUTIJON)
    let datas = formatJsonNautijon(json)
    return datas
}

const fetchRss = async (url) => {
    const response = await axios.get('https://cors-anywhere.herokuapp.com/' + url)
    const json = JSON.parse(convert.xml2json(response.data, {compact: true, spaces: 4}));
    return json 
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
        const href = desc[0].match('(https.*\.jpg)')
        let item = {
            title: items[i].title['_text'],
            desc: desc[1],
            link: items[i].link['_text'],
            pubDate: items[i].pubDate['_text'],
            site: 'Nautijon',
            img: href[0]
        }
        array.push(item)
    }
    return array
}