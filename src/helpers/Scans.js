import { fetchRss, isInList } from './Shared'
import { SCANTRAD, MANGAFOX } from '../rss';
import Axios from 'axios';

export const getScans = async () => {
    let scans = []
    let scantrad = await getScantrad()
    scans = scans.concat(scantrad)
    scans.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))

    let cache = JSON.parse(localStorage.getItem('cache'))
    cache.scans = scans
    cache.scansDate = new Date()
    localStorage.setItem('cache', JSON.stringify(cache))

    return scans
}

export const getScansVA = async () => {
    let scansVa = []
    let mangaFox = await getMangaFox()
    scansVa = scansVa.concat(mangaFox)

    let cache = JSON.parse(localStorage.getItem('cache'))
    cache.scansVa = scansVa
    cache.scansVaDate = new Date()
    localStorage.setItem('cache', JSON.stringify(cache))

    return scansVa
}

const getScantrad = async () => {
    let json = await fetchRss(SCANTRAD)
    let datas = formatJsonScantrad(json)
    return datas
}

const getMangaFox = async () => {
    let datas = []
    for(let i = 1; i <= 10; i++) {
        let json = await Axios.get('https://cors-anywhere.herokuapp.com/' + MANGAFOX + i + '.html')
        let data = formatJsonMangaFox(json)
        datas = datas.concat(data)
    }

    return datas
}

const formatJsonScantrad = (json) => {
    let array = []
    const items = json.rss.channel.item
    for(var i = 0; i < items.length; i++) {
        if(isInList(items[i].title['_cdata'].toUpperCase(), 'scans')) {
            let title = items[i].title['_cdata'].replace('Scan - ', '')
            title = title.replace('Chapitre ', '')
            let item = {
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

const formatJsonMangaFox = (json) => {
    let array = []
    const doc = new DOMParser().parseFromString(json.data, 'text/html')
    const ul = doc.getElementsByClassName('manga-list-4-list')[0]
    for(let i = 0; i < ul.children.length; i++) {
        let title = ul.children[i].children[1].innerText
        if(isInList(title.toUpperCase(), 'scans') && ul.children[i].children[3].children[0]) {
            let img = ul.children[i].children[0].children[0].attributes[1].value
            let date = ul.children[i].children[2].children[0].innerText
            let chapt = ul.children[i].children[3].children[0].innerText.replace('Ch.', '')
            let link = ul.children[i].children[3].children[0].children[1].attributes[0].value
            let item = {
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