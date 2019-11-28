import axios from 'axios';
import { scansList, animeList } from '../mangas'

var convert = require('xml-js');

export const fetchRss = async (url) => {
    const response = await axios.get('https://cors-anywhere.herokuapp.com/' + url)
    const json = JSON.parse(convert.xml2json(response.data, {compact: true, spaces: 4}));
    return json
}

export const isInList = (title, type) => {
    let isInList = false
    let list = scansList
    if(type === 'animes')
        list = animeList
    for(let item of list) {
        if(title.includes(item))
            isInList = true
    }
    return isInList
}