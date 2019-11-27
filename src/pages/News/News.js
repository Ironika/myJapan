import React, { useState, useEffect } from 'react';
import { getNews } from '../../helpers/News'

import Card from '../../components/News/Card'
import Loader from '../../components/Loader/Loader'
import './News.scss';

const News = () => {
    const [news, setNews] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const fetchDatas = async () => {
            const news = await getNews()
            setNews(news)
            setLoader(false)
        }

        fetchDatas()
    }, []);

    return (
        <div className="News">
            <h2>NEWS</h2>
            <div className="card-container">
                {   loader ? <Loader /> :
                    news.map(item => 
                        <Card key={item.pubDate} news={item} />
                    )
                }
            </div>
        </div>
    );
}

export default News;
