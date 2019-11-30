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

export function dateDiff(date1, date2){
    var diff = {}
    var tmp = date2 - date1;

    tmp = Math.floor(tmp/1000);
    diff.sec = tmp % 60;

    tmp = Math.floor((tmp-diff.sec)/60);
    diff.min = tmp % 60;

    tmp = Math.floor((tmp-diff.min)/60);
    diff.hour = tmp % 24;

    tmp = Math.floor((tmp-diff.hour)/24);
    diff.day = tmp;

    return diff;
}