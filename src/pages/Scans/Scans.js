import React, { useState, useEffect } from 'react';
import debounce from "lodash.debounce";
import LazyLoad from 'react-lazyload';
import { getScans, getScansVA } from '../../helpers/Scans'
import { dateDiff } from '../../helpers/Shared'
import Loader from '../../components/Loader/Loader'
import CardVa from '../../components/Scans/CardVa'
import Card from '../../components/Scans/Card'

import './Scans.scss';

const Scans = () => {
  const pageToDisplay = 12
  const [scans, setScans] = useState([])
  const [scansVa, setScansVa] = useState([])
  const [displayedScansVa, setDisplayedScansVa] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [loader, setLoader] = useState(true)
  const [loaderVa, setLoaderVa] = useState(true)

  useEffect(() => {
    const fetchScans = async () => {
      const currentScans = [...await getScans()]
      setScans(currentScans)
      setLoader(false)
    }
    const fetchScansVa = async () => {
      const currentScansVa = [...await getScansVA()]
      setScansVa(currentScansVa)
      setDisplayedScansVa(currentScansVa.slice(0, pageToDisplay))
      setLoaderVa(false)
    }

    const cache = JSON.parse(sessionStorage.getItem('cache'))
    if(cache.scans && dateDiff(new Date(cache.scansDate), new Date()).min < 5 ) {
        const currentScans = cache.scans
        setScans(currentScans)
        setLoader(false)
    } else {
        fetchScans()
    }

    if(cache.scansVa && dateDiff(new Date(cache.scansVaDate), new Date()).min < 5 ) {
      const currentScansVa = cache.scansVa
      setScansVa(currentScansVa)
      setDisplayedScansVa(currentScansVa.slice(0, pageToDisplay))
      setLoaderVa(false)
    } else {
        fetchScansVa()
    }

  }, []);

  const loadItems = () => {
    let nbToDisplay = displayedScansVa.length + pageToDisplay
    if (nbToDisplay > scansVa.length) {
      nbToDisplay = scansVa.length
      setHasMore(false)
    }
    setDisplayedScansVa(scansVa.slice(0, nbToDisplay))
  }

  window.onscroll = debounce(() => {
    if (!hasMore) return
    let scroll = window.innerHeight + document.documentElement.scrollTop
    if (scroll === document.documentElement.offsetHeight)
      loadItems()
  }, 100);

  return (
    <div className="Scans">
      <h1>SCANS</h1>
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
          <div className="card-container">
              {loaderVa ? <Loader /> :
                displayedScansVa.map((item, index) =>
                  <LazyLoad key={index} placeholder={<Loader />}>
                    <CardVa news={item} />
                  </LazyLoad>
                )
              }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scans;
