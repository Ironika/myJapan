import React, { useState, useEffect } from 'react';
import { getNews } from '../../helpers/News'
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
            const news = await getNews()
            setNews(news)
            setDisplayedNews(news.slice(0, pageToDisplay))
            setLoader(false)
        }

        fetchDatas()
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
                        <LazyLoad key={index} placeholder={<Loader />}>
                            <Card news={item} />
                        </LazyLoad>
                    )
                }
            </div>
        </div>
    );
}

export default News;
