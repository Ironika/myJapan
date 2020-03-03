import React from 'react';
import Tilt from 'react-tilt';

import './CardVa.scss';


const CardVa = (props) => {
    return (
        <Tilt className="tilt">
            <div className="card-scans-va" style={{ backgroundImage: 'url(' + props.item.img + ')' }} onClick={() => window.open(props.item.link, '_blank')}>
                <a href={props.item.link} className="card-scans-va-content" target="_blank" rel="noopener noreferrer">
                    <p className="date">{props.item.pubDate}</p>
                    <h3>{props.item.title}</h3>
                    <button>{props.item.lang}</button>
                </a>
            </div>
        </Tilt>
    )
};

export default CardVa;