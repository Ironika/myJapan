import React from 'react';
import Tilt from 'react-parallax-tilt';

import './Card.scss';


const Card = (props) => {
    let pubDate;
    if(props.news.pubDate.includes('ago') || props.news.pubDate.includes('Today') || props.news.pubDate.includes('Yesterday'))
        pubDate = props.news.pubDate
    else {
        pubDate = new Date(props.news.pubDate)
        pubDate = pubDate.toLocaleDateString()
    }

    return (
        <Tilt style={{width: '10%'}}>
            <div className="card-scans">
                <a href={props.news.link} target="_blank" rel="noopener noreferrer">
                    <img src={props.news.img} alt={props.news.title}/>
                    <div className="card-scans-content">
                        <p className="date">{pubDate}</p>
                        <h3>{props.news.title}</h3>
                        <button>{props.news.lang}</button>
                    </div>
                </a>
            </div>
        </Tilt>
    )
};

export default Card;