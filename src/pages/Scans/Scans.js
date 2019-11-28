import React, { useState, useEffect } from 'react';
import debounce from "lodash.debounce";
import LazyLoad from 'react-lazyload';
import { getScans, getScansVA } from '../../helpers/Scans'
import Loader from '../../components/Loader/Loader'
import Card from '../../components/Scans/Card'

import './Scans.scss';

const Scans = () => {
  const pageToDisplay = 12
  const [scans, setScans] = useState([])
  const [displayedScans, setDisplayedScans] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    const fetchDatas = async () => {
      const scans = await getScans()
      // const scansVa = await getScansVA()
      setScans(scans)
      setDisplayedScans(scans.slice(0, pageToDisplay))
      setLoader(false)
    }

    fetchDatas()
  }, []);

  const loadItems = () => {
    let nbToDisplay = displayedScans.length + pageToDisplay
    if (nbToDisplay > scans.length) {
      nbToDisplay = scans.length
      setHasMore(false)
    }
    setDisplayedScans(scans.slice(0, nbToDisplay))
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
      <div className="card-container">
          {   loader ? <Loader /> :
              displayedScans.map((item, index) =>
                  <LazyLoad key={index} placeholder={<Loader />}>
                      <Card news={item} />
                  </LazyLoad>
              )
          }
      </div>
    </div>
  );
}

export default Scans;
