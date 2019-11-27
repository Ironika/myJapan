import axios from 'axios';

var convert = require('xml-js');

export const fetchRss = async (url) => {
    const response = await axios.get('https://cors-anywhere.herokuapp.com/' + url)
    const json = JSON.parse(convert.xml2json(response.data, {compact: true, spaces: 4}));
    return json
}