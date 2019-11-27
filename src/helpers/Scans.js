import { fetchRss, isInMangas } from './Shared'
import { SCANTRAD } from '../rss';

export const getScans = async () => {
    let scans = []
    let scantrad = await getScantrad()

    scans = scans.concat(scantrad)

    scans.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))

    return scans
}

const getScantrad = async () => {
    let json = await fetchRss(SCANTRAD)
    let datas = formatJsonScantrad(json)
    return datas
}

const formatJsonScantrad = (json) => {
    let array = []
    const items = json.rss.channel.item
    for(var i = 0; i < items.length; i++) {
        if(isInMangas(items[i].title['_cdata'].toUpperCase())) {
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