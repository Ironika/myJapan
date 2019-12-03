'use strict';

const axios = require('axios');
const { isInList } = require('./Shared');
const { ANIME_SEIKOU, UNIVERSANIMEIZ } = require('../rss');
const cheerio = require('cheerio');

class Animes  {
    getAnimes = async () => {
        let animes = []
        await this.getAnimeSeikou(animes)
        // await this.getUniversAnimeiz(animes)
        return animes
    }
    getAnimeSeikou = async (array) => {
        for(let i = 1; i <= 2; i++) {
            let json = await axios.get(ANIME_SEIKOU + i + '/')
            this.formatJsonAnimeSeikou(json, array)
        }
        return array
    }
    
    getUniversAnimeiz = async (array) => {
        for(let i = 1; i <= 2; i++) {
            let json = await axios.get(UNIVERSANIMEIZ + i + '/')
            this.formatJsonUniversAnimeiz(json, array)
        }
        return array
    }

    formatJsonAnimeSeikou = (json, array) => {
        const $ = cheerio.load(json.data)
        const items = $('.slide-entry')
        console.error('ITEMS ',items.children())
        console.error('Length ',items.children().length)
        for(let i = 0; i < items.length; i++) {
            console.error('totototo ',items[i].children[3].children[5].text())
            let title = items[i].children[3].children[5].innerText
            title = title.replace('VOSTFR', '')
            title = title.replace('vostfr', '')
            if(isInList(title.toUpperCase(), 'animes')) {
                let img = items[i].children[0].children[0].attributes[2].value
                let date = items[i].children[3].children[3].innerText
                let link = items[i].children[0].href
                let item = {
                    title: title,
                    link: link,
                    // pubDate: date,
                    site: 'Anime Seikou',
                    img: img,
                    lang: 'VOSTFR'
                }
                if(!this.isInArray(item, array))
                    array.push(item)
            }
        }
    }
    
    formatJsonUniversAnimeiz = (json, array) => {
        const doc = DOMParser().parseFromString(json.data, 'text/html')
        const items = doc.getElementsByClassName('recent-posts')[0]
        for(let i = 0; i < items.children.length; i++) {
            let title = items.children[i].children[1].children[1].innerText
            title = title.replace('VOSTFR', '')
            title = title.replace('vostfr', '')
            if(isInList(title.toUpperCase(), 'animes') && !title.includes('VF')) {
                let episode = items.children[i].children[1].children[3].innerText
                let img = items.children[i].children[0].children[0].children[0].attributes[0].value
                let link = items.children[i].children[0].children[0].href
                let item = {
                    title: title + ' ' + episode.replace('Épisode ', ''),
                    link: link,
                    site: 'Univers Animeiz',
                    img: img,
                    lang: 'VOSTFR'
                }
                if(!this.isInArray(item, array))
                    array.push(item)
            }
        }
    }
    isInArray = (item, array) => {
        let isInArray = false
        for(let anime of array){
            if(anime.title.includes(item.title))
                return isInArray = true
        }
        return isInArray
    }
}

module.exports = Animes;