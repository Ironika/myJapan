import React, { useState, useEffect } from 'react';
import debounce from "lodash.debounce";
import LazyLoad from 'react-lazyload';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ParallaxBanner } from 'react-scroll-parallax';
import { getScans, getScansVA } from '../../helpers/Scans'
import { dateDiff } from '../../helpers/Shared'
import Loader from '../../components/Loader/Loader'
import CardVa from '../../components/Scans/CardVa'
import Card from '../../components/Scans/Card'
import banner from '../../assets/img/banner.jpg'

import './Scans.scss';

const Scans = () => {
  const pageToDisplay = 12
  const [nbToDisplay, setNbToDisplay] = useState(12)
  const [scans, setScans] = useState([])
  const [scansVa, setScansVa] = useState([])
  const [displayedScansVa, setDisplayedScansVa] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [loader, setLoader] = useState(true)
  const [loaderVa, setLoaderVa] = useState(true)
  const [deepLoader, setDeepLoader] = useState(false)

  useEffect(() => {
    const fetchScans = async () => {
      const currentScans = [...await getScans()]
      setScans(currentScans)
      setLoader(false)
    }
    const fetchScansVa = async (flag) => {
      const currentScansVa = [...await getScansVA()]
      setScansVa(currentScansVa)
      setDisplayedScansVa(currentScansVa.slice(0, nbToDisplay))
      setLoaderVa(false)
      if(flag) {
        setHasMore(true)
        setDeepLoader(false)
      }
    }

    const cache = JSON.parse(localStorage.getItem('cache'))
    if (cache.scans) {
      const currentScans = cache.scans
      setScans(currentScans)
      setLoader(false)
      if (dateDiff(new Date(cache.scansDate), new Date()).min > 10) 
        fetchScans()
    } else {
      fetchScans()
    }

    if (cache.scansVa) {
      const currentScansVa = cache.scansVa
      setScansVa(currentScansVa)
      setDisplayedScansVa(currentScansVa.slice(0, pageToDisplay))
      setLoaderVa(false)
      if (dateDiff(new Date(cache.scansVaDate), new Date()).min > 10) {
        fetchScansVa(true)
        setDeepLoader(true)
      }
    } else {
      fetchScansVa()
    }

  }, [deepLoader, nbToDisplay]);

  const loadItems = () => {
    let currentNbToDisplay = displayedScansVa.length + pageToDisplay
    if (currentNbToDisplay > scansVa.length) {
      currentNbToDisplay = scansVa.length
      setHasMore(false)
    }
    setNbToDisplay(currentNbToDisplay)
    setDisplayedScansVa(scansVa.slice(0, currentNbToDisplay))
  }

  window.onscroll = debounce(() => {
    if (!hasMore) return
    let scroll = window.innerHeight + document.documentElement.scrollTop
    if (scroll === document.documentElement.offsetHeight)
      loadItems()
  }, 100);

  return (
    <div className="Scans">
      <ParallaxProvider>
        <ParallaxBanner className="homescreen banner" layers={[{ image: banner, amount: 0.5 }]} style={{ height: '300px' }}>
          <h1 className="title">SCANS</h1>
        </ParallaxBanner>
        <div className="container">
          <div className="left">
            <div className="card-container">
              {loader ? <Loader /> :
                scans.map((item, index) =>
                  <LazyLoad key={index} placeholder={<Loader />}>
                    <Card news={item} />
                  </LazyLoad>
                )
              }
            </div>
          </div>
          <div className="right">
            {deepLoader && <Loader style={{marginTop: '20px'}}/>}
            <div className="card-container">
              {loaderVa ? <Loader /> :
                displayedScansVa.map((item, index) =>
                  <LazyLoad key={index} placeholder={<Loader />}>
                    <CardVa item={item} />
                  </LazyLoad>
                )
              }
            </div>
          </div>
        </div>
      </ParallaxProvider>
    </div>
  );
}

export default Scans;
