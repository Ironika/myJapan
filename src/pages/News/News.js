import React, { useState, useEffect } from 'react';
import { getNews } from '../../helpers/News'
import LazyLoad from 'react-lazyload';

import Card from '../../components/News/Card'
import Loader from '../../components/Loader/Loader'
import './News.scss';

const News = () => {
    const [news, setNews] = useState([])
    const [displayedNews, setDisplayedNews] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        const fetchDatas = async () => {
            const news = await getNews()
            setNews(news)
            setDisplayedNews(news.slice(0, 12))
            setLoader(false)
        }

        fetchDatas()
    }, []);

    const loadItems = () => {
        setDisplayedNews(news.slice(12, 24))
        setHasMore(false)
    }

    return (
        <div className="News">
            <h1>NEWS</h1>
            <div className="card-container">
                {   loader ? <Loader /> :
                    displayedNews.map(item =>
                        <LazyLoad key={item.pubDate} placeholder={<div>Loading...</div>}>
                            <Card key={item.pubDate} news={item} />
                        </LazyLoad>
                    )
                }
            </div>
        </div>
    );
}

export default News;
