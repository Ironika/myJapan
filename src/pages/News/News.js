import React, { useState, useEffect } from 'react';
import { getNews } from '../../helpers/News'
import { dateDiff } from '../../helpers/Shared'
import LazyLoad from 'react-lazyload';
import debounce from "lodash.debounce";
import { ParallaxProvider } from 'react-scroll-parallax';
import { ParallaxBanner } from 'react-scroll-parallax';
import Card from '../../components/News/Card'
import Loader from '../../components/Loader/Loader'
import banner from '../../assets/img/banner.jpg'
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

        const cache = JSON.parse(localStorage.getItem('cache'))
        if(cache.news) {
            const currentNews = cache.news
            setNews(currentNews)
            setDisplayedNews(currentNews.slice(0, pageToDisplay))
            setLoader(false)
            if(dateDiff(new Date(cache.newsDate), new Date()).min < 5)
                fetchDatas()
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
            <ParallaxProvider>
                <ParallaxBanner className="homescreen" layers={[{ image: banner, amount: 0.5 }]} style={{ height: '300px' }}>
                    <h1 className="title">NEWS</h1>
                </ParallaxBanner>
                <div className="card-container">
                    {   loader ? <Loader /> :
                        displayedNews.map((item, index) =>
                            <Card key={index} news={item} />
                        )
                    }
                </div>
            </ParallaxProvider>
        </div>
    );
}

export default News;
