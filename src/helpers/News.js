import axios from 'axios';

export const fetchRss = async (url) => {
    // const response = await axios.get('http://crossorigin.me/' + url)
    const response = await axios.get('http://www.whateverorigin.org/get?url=' + url)
    console.log(response)
}