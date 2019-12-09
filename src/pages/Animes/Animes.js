import React, { useState, useEffect } from 'react';
import { getAnimes } from '../../helpers/Animes'
import { dateDiff } from '../../helpers/Shared'
import debounce from "lodash.debounce";
import { ParallaxProvider } from 'react-scroll-parallax';
import { ParallaxBanner } from 'react-scroll-parallax';
import Card from '../../components/Animes/Card'
import Loader from '../../components/Loader/Loader'
import banner from '../../assets/img/banner.jpg'
import './Animes.scss';

const Animes = () => {
    const pageToDisplay = 9
    const [animes, setAnimes] = useState([])
    const [displayedAnimes, setDisplayedAnimes] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [loader, setLoader] = useState(true)
    const [deepLoader, setDeepLoader] = useState(false)

    useEffect(() => {
        const fetchDatas = async () => {
            const currentAnimes = await getAnimes()
            setAnimes(currentAnimes)
            setDisplayedAnimes(currentAnimes.slice(0, pageToDisplay))
            setLoader(false)
            if(deepLoader) {
                setDeepLoader(false)
            }
        }

        const cache = JSON.parse(localStorage.getItem('cache'))
        if(cache.animes) {
            const currentAnimes = cache.animes
            setAnimes(currentAnimes)
            setDisplayedAnimes(currentAnimes.slice(0, pageToDisplay))
            setLoader(false)
            if(dateDiff(new Date(cache.animesDate), new Date()).min > 10) {
                fetchDatas()
                setDeepLoader(true)
            }
        } else {
            fetchDatas()
        }

    }, [deepLoader]);

    const loadItems = () => {
        let nbToDisplay = displayedAnimes.length + pageToDisplay
        if(nbToDisplay > animes.length) {
            nbToDisplay = animes.length
            setHasMore(false)
        }
        setDisplayedAnimes(animes.slice(0, nbToDisplay))
    }

    window.onscroll = debounce(() => {
        if (!hasMore) return
        let scroll = window.innerHeight + document.documentElement.scrollTop
        if ( scroll === document.documentElement.offsetHeight)
            loadItems()
    }, 100);

    return (
        <div className="Animes">
            <ParallaxProvider>
                <ParallaxBanner className="homescreen banner" layers={[{ image: banner, amount: 0.5 }]} style={{ height: '300px' }}>
                    <h1 className="title">ANIMES</h1>
                </ParallaxBanner>
                {deepLoader && <Loader style={{marginTop: '20px'}} />}
                <div className="card-container">
                    {   loader ? <Loader /> :
                        displayedAnimes.map((item, index) =>
                            <Card key={index} item={item} />
                        )
                    }
                </div>
            </ParallaxProvider>
        </div>
    );
}

export default Animes;
