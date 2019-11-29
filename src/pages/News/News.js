import React, { useState, useEffect } from 'react';
import { getNews } from '../../helpers/News'
import { dateDiff } from '../../helpers/Shared'
import LazyLoad from 'react-lazyload';
import debounce from "lodash.debounce";

import Card from '../../components/News/Card'
import Loader from '../../components/Loader/Loader'
import './News.scss';

const News = () => {
    const pageToDisplay = 12
    const [news, setNews] = useState([])
    const [displayedNews, setDisplayedNews] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        const fetchDatas = async () => {
            const currentNews = await getNews()
            setNews(currentNews)
            setDisplayedNews(currentNews.slice(0, pageToDisplay))
            setLoader(false)
        }

        const cache = JSON.parse(sessionStorage.getItem('cache'))
        if(cache.news && dateDiff(new Date(cache.newsDate), new Date()).min < 5 ) {
            const currentNews = cache.news
            setNews(currentNews)
            setDisplayedNews(currentNews.slice(0, pageToDisplay))
            setLoader(false)
        } else {
            fetchDatas()
        }

    }, []);

    const loadItems = () => {
        let nbToDisplay = displayedNews.length + pageToDisplay
        if(nbToDisplay > news.length) {
            nbToDisplay = news.length
            setHasMore(false)
        }
        setDisplayedNews(news.slice(0, nbToDisplay))
    }

    window.onscroll = debounce(() => {
        if (!hasMore) return
        let scroll = window.innerHeight + document.documentElement.scrollTop
        if ( scroll === document.documentElement.offsetHeight)
            loadItems()
    }, 100);

    return (
        <div className="News">
            <h1>NEWS</h1>
            <div className="card-container">
                {   loader ? <Loader /> :
                    displayedNews.map((item, index) =>
                        <Card key={index} news={item} />
                    )
                }
            </div>
        </div>
    );
}

export default News;
