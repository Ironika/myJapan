import { fetchRss, isInList } from './Shared'
import { ANIME_SEIKOU } from '../rss';
import Axios from 'axios';

export const getAnimes = async () => {
    let animes = []
    let animeSeikou = await getAnimeSeikou()
    animes = animes.concat(animeSeikou)

    let cache = JSON.parse(localStorage.getItem('cache'))
    cache.animes = animes
    cache.animesDate = new Date()
    localStorage.setItem('cache', JSON.stringify(cache))

    return animes
}

const getAnimeSeikou = async () => {
    let datas = []
    for(let i = 1; i <= 2; i++) {
        let json = await Axios.get('https://cors-anywhere.herokuapp.com/' + ANIME_SEIKOU + i + '/')
        let data = formatJsonAnimeSeikou(json)
        datas = datas.concat(data)
    }
    return datas
}

const formatJsonAnimeSeikou = (json) => {
    let array = []
    const doc = new DOMParser().parseFromString(json.data, 'text/html')
    const container = doc.getElementsByClassName('avia-content-slider-inner')[0]
    console.log(container.children)
    for(let i = 0; i < container.children.length; i++) {
        for(let y = 0; y < container.children[i].children.length; y++) {
            let title = container.children[i].children[y].children[1].children[0].children[1].innerText
            if(isInList(title.toUpperCase(), 'animes')) {
                let img = container.children[i].children[y].children[0].children[0].attributes[2].value
                let date = new Date()
                let link = container.children[i].children[y].children[0].attributes[0].value
                let item = {
                    title: title,
                    link: link,
                    pubDate: date,
                    site: 'Anime Seikou',
                    img: img,
                    lang: 'VOSTFR'
                }
                array.push(item)
            }
        }
    }
    console.log(array)
    return array
}