import { isInList } from './Shared'
import { ANIME_SEIKOU, UNIVERSANIMEIZ } from '../rss';
import Axios from 'axios';

export const getAnimes = async () => {
    let animes = []
    await getAnimeSeikou(animes)
    await getUniversAnimeiz(animes)

    let cache = JSON.parse(localStorage.getItem('cache'))
    cache.animes = animes
    cache.animesDate = new Date()
    localStorage.setItem('cache', JSON.stringify(cache))

    return animes
}

const getAnimeSeikou = async (array) => {
    for(let i = 1; i <= 2; i++) {
        let json = await Axios.get('https://cors-anywhere.herokuapp.com/' + ANIME_SEIKOU + i + '/')
        formatJsonAnimeSeikou(json, array)
    }
    return array
}

const getUniversAnimeiz = async (array) => {
    for(let i = 1; i <= 2; i++) {
        let json = await Axios.get('https://cors-anywhere.herokuapp.com/' + UNIVERSANIMEIZ + i + '/')
        formatJsonUniversAnimeiz(json, array)
    }
    return array
}

const formatJsonAnimeSeikou = (json, array) => {
    const doc = new DOMParser().parseFromString(json.data, 'text/html')
    const items = doc.getElementsByClassName('slide-entry')
    for(let i = 0; i < items.length; i++) {
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
            if(!isInArray(item, array))
                array.push(item)
        }
    }
}

const formatJsonUniversAnimeiz = (json, array) => {
    const doc = new DOMParser().parseFromString(json.data, 'text/html')
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
            if(!isInArray(item, array))
                array.push(item)
        }
    }
}

const isInArray = (item, array) => {
    let isInArray = false
    for(let anime of array){
        if(anime.title.includes(item.title))
            return isInArray = true
    }
    return isInArray
}