import React, { useState, useEffect } from 'react';
import { fetchRss } from '../../helpers/News'
import { ADALA, NAUTIJON } from '../../rss'

import './News.scss';

const News = () => {
    const [adala, setAdala] = useState([]);

    useEffect(() => {
        const fetchDatas = async () => {
            const newsAdala = await fetchRss(ADALA)
            setAdala(adala)
        }

        fetchDatas()
    }, [adala]);

    return (
        <div className="News">
            <h2>NEWS</h2>
        </div>
    );
}

export default News;
