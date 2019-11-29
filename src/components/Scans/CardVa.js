import React from 'react';
import Tilt from 'react-tilt';

import './CardVa.scss';


const CardVa = (props) => {
    let pubDate;
    if(props.news.pubDate.includes('ago') || props.news.pubDate.includes('Today') || props.news.pubDate.includes('Yesterday'))
        pubDate = props.news.pubDate
    else {
        pubDate = new Date(props.news.pubDate)
        pubDate = pubDate.toLocaleDateString()
    }

    return (
        <Tilt className="tilt">
            <div className="card-scans-va" style={{ backgroundImage: 'url(' + props.news.img + ')' }}>
                <a href={props.news.link} className="card-scans-va-content" target="_blank" rel="noopener noreferrer">
                    <p className="date">{pubDate}</p>
                    <h3>{props.news.title}</h3>
                    <button>{props.news.lang}</button>
                </a>
            </div>
        </Tilt>
    )
};

export default CardVa;