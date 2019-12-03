'use strict';

const { fetchRss } = require('./Shared');
const { ADALA, NAUTIJON, MANGASNEWS } = require('../rss');

class News  {
    getNews = async () => {
        let news = []
        const adala = await this.getAdalaNews()
        const nautijon = await this.getNautijonNews()
        const mangasNews = await this.getMangasNews()
    
        news = news.concat(adala, nautijon, mangasNews)
    
        news.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
    
        return news
    }
    getAdalaNews = async () => {
        const json = await fetchRss(ADALA)
        const datas = this.formatJsonAdala(json)
        return datas
    }
    getNautijonNews = async () => {
        const json = await fetchRss(NAUTIJON)
        const datas = this.formatJsonNautijon(json)
        return datas
    }
    getMangasNews = async () => {
        const json = await fetchRss(MANGASNEWS)
        const datas = this.formatJsonMangasNews(json)
        return datas
    }
    formatJsonAdala = (json) => {
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
    formatJsonNautijon = (json) => {
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
    formatJsonMangasNews = (json) => {
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
}

module.exports = News;