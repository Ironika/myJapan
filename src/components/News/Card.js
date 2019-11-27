import React from 'react';

const Card = (props) => (
    <div className="card">
        <a href={props.news.link} target="_blank">
            <img src={props.news.img} alt={props.news.title}/>
            <div className="card-content">
                <h3>{props.news.title}</h3>
                <p>{props.news.desc}</p>
            </div>
        </a>
    </div>
);

export default Card;