import React, { useState, useEffect } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ParallaxBanner } from 'react-scroll-parallax';
import { Link } from 'react-router-dom';
import { getNews } from '../../helpers/News'
import LazyLoad from 'react-lazyload';
import Loader from '../../components/Loader/Loader'
import Card from '../../components/News/Card'
import FlipCard from '../../components/Home/FlipCard'

import './Home.scss';
import homescreen from '../../assets/img/homescreen.jpg'
import homescreen2 from '../../assets/img/homescreen2.jpg'
import homescreen3 from '../../assets/img/homescreen3.jpg'
import { NEWS, SCANS } from '../../routes'

const Home = () => {
  const [news, setNews] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchDatas = async () => {
        let news = await getNews()
        news.length = 4
        setNews(news)
        setLoader(false)
    }

    fetchDatas()
}, []);

  return (
    <div className="Home">

        <ParallaxProvider>
                <ParallaxBanner className="homescreen" layers={[{ image: homescreen, amount: 0.5 }]} style={{height: '450px'}}></ParallaxBanner>
                <FlipCard />
                <LazyLoad placeholder={<Loader />}>
                    <ParallaxBanner className="homescreen" layers={[{ image: homescreen2, amount: 0.5 }]} style={{height: '450px'}}></ParallaxBanner>
                </LazyLoad>
                <section>
                    <div className="news">
                      <h2>Last News</h2>
                      <div className="card-container">
                          {   loader ? <Loader /> :
                              news.map(item =>
                                <LazyLoad key={item.pubDate} placeholder={<Loader />}>
                                  <Card key={item.pubDate} news={item} />
                                </LazyLoad>
                              )
                          }
                      </div>
                      <div className="cta">
                          <Link to={NEWS}>Voir plus</Link>
                      </div>
                    </div>
                </section>
                <LazyLoad placeholder={<Loader />}>
                  <ParallaxBanner className="homescreen" layers={[{ image: homescreen3, amount: 0.5 }]} style={{height: '450px'}}></ParallaxBanner>
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
