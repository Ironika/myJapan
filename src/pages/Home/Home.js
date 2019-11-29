import React, { useState, useEffect } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ParallaxBanner } from 'react-scroll-parallax';
import { Link } from 'react-router-dom';
import { getNews } from '../../helpers/News'
import { dateDiff } from '../../helpers/Shared'
import LazyLoad from 'react-lazyload';
import Loader from '../../components/Loader/Loader'
import Card from '../../components/News/Card'
import FlipCard from '../../components/Home/FlipCard/FlipCard'
import PresentationVF from '../../components/Home/Presentation/PresentationVF'
import PresentationVA from '../../components/Home/Presentation/PresentationVA'
import DescriptionVF from '../../components/Home/Description/DescriptionVF'
import DescriptionVA from '../../components/Home/Description/DescriptionVA'

import './Home.scss';
import banner from '../../assets/img/banner.jpg'
import homescreen from '../../assets/img/homescreen.jpg'
import homescreen2 from '../../assets/img/homescreen2.jpg'
import homescreen3 from '../../assets/img/homescreen3.jpg'
import { NEWS, SCANS } from '../../routes'

const Home = () => {
  const [news, setNews] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchDatas = async () => {
      let currentNews = [...await getNews()]
      currentNews.length = 4
      setNews(currentNews)
      setLoader(false)
    }

    const cache = JSON.parse(localStorage.getItem('cache'))
    if (cache.news) {
      const currentNews = [...cache.news]
      currentNews.length = 4
      setNews(currentNews)
      setLoader(false)
      if(dateDiff(new Date(cache.newsDate), new Date()).min < 5)
        fetchDatas()
    } else {
      fetchDatas()
    }
  }, []);

  return (
    <div className="Home">

      <ParallaxProvider>
        <ParallaxBanner className="homescreen" layers={[{ image: banner, amount: 0.5 }]} style={{ height: '300px' }}>
          <h1 className="title">HOME</h1>
        </ParallaxBanner>
        <FlipCard front={<PresentationVF />} back={<PresentationVA />} />
        <LazyLoad placeholder={<Loader />}>
          <ParallaxBanner className="homescreen" layers={[{ image: homescreen2, amount: 0.5 }]} style={{ height: '450px' }}></ParallaxBanner>
        </LazyLoad>
        <FlipCard front={<DescriptionVF />} back={<DescriptionVA />} />
        <LazyLoad placeholder={<Loader />}>
          <ParallaxBanner className="homescreen" layers={[{ image: homescreen3, amount: 0.5 }]} style={{ height: '450px' }}></ParallaxBanner>
        </LazyLoad>
        <section>
          <div className="news">
            <h2>Last News</h2>
            <div className="card-container">
              {loader ? <Loader /> :
                news.map((item, index) =>
                  <Card key={index} news={item} />
                )
              }
            </div>
            <div className="cta">
              <Link to={NEWS}>Voir plus</Link>
            </div>
          </div>
        </section>
        <LazyLoad placeholder={<Loader />}>
          <ParallaxBanner className="homescreen" layers={[{ image: homescreen, amount: 0.5 }]} style={{ height: '450px' }}></ParallaxBanner>
        </LazyLoad>
        <section>
          <div className="scans">
            <h2>Last Scans</h2>
            <div className="card-container">
              {   /*loader ? <Loader /> :
                              news.map(item =>
                                <LazyLoad key={item.pubDate} placeholder={<Loader />}>
                                  <Card key={item.pubDate} news={item} />
                                </LazyLoad>
                              )
                          */}
            </div>
            <div className="cta">
              <Link to={SCANS}>Voir plus</Link>
            </div>
          </div>
        </section>
      </ParallaxProvider>

    </div>
  );
}

export default Home;
