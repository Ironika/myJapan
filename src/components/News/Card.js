import React from 'react';
import LazyLoad from 'react-lazyload';

import Loader from '../../components/Loader/Loader'
import './Card.scss';


const Card = (props) => {
    const pubDate = new Date(props.news.pubDate)
    return (
        <LazyLoad placeholder={<Loader />}>
            <div className="card">
                <a href={props.news.link} target="_blank" rel="noopener noreferrer">
                    <img src={props.news.img} alt={props.news.title}/>
                    <div className="card-content">
                        <button>{props.news.site}</button>
                        <span className="date">{pubDate.toLocaleString()}</span>
                        <h3>{props.news.title}</h3>
                        <p>{props.news.desc.length > 200 ? props.news.desc.substring(0,150) + '...' : props.news.desc}</p>
                    </div>
                </a>
            </div>
        </LazyLoad>
    )
};

export default Card;