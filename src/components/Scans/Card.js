import React from 'react';

import './Card.scss';

const Card = (props) => {
    let pubDate = new Date(props.news.pubDate)
        pubDate = pubDate.toLocaleDateString()

    return (
        <div className="card-scans">
            <a href={props.news.link} className="card-scans-container" target="_blank" rel="noopener noreferrer">
                <img src={props.news.img} alt={props.news.title}/>
                <div className="card-scans-container-content">
                    <p className="date">{pubDate}</p>
                    <h3>{props.news.title}</h3>
                    <button>{props.news.lang}</button>
                </div>
            </a>
        </div>
    )
};

export default Card;