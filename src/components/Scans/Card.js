import React from 'react';
import Tilt from 'react-parallax-tilt';

import './Card.scss';


const Card = (props) => {
    const pubDate = new Date(props.news.pubDate)
    return (
        <Tilt style={{width: '10%'}}>
            <div className="card-scans">
                <a href={props.news.link} target="_blank" rel="noopener noreferrer">
                    <img src={props.news.img} alt={props.news.title}/>
                    <div className="card-scans-content">
                        <p className="date">{pubDate.toLocaleDateString()}</p>
                        <h3>{props.news.title}</h3>
                        <button>{props.news.lang}</button>
                    </div>
                </a>
            </div>
        </Tilt>
    )
};

export default Card;