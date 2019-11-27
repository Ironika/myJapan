import axios from 'axios';
import { mangas } from '../mangas'

var convert = require('xml-js');

export const fetchRss = async (url) => {
    const response = await axios.get('https://cors-anywhere.herokuapp.com/' + url)
    const json = JSON.parse(convert.xml2json(response.data, {compact: true, spaces: 4}));
    return json
}

export const isInMangas = (title) => {
    let isInMangas = false
    for(let item of mangas) {
        if(title.includes(item))
            isInMangas = true
    }
    return isInMangas
}