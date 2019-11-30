import React from 'react';
import Tilt from 'react-tilt';

import './CardVa.scss';


const CardVa = (props) => {
    let pubDate;
    if((typeof props.item.pubDate === 'string') && props.item.pubDate.includes('ago') || props.item.pubDate.includes('Today') || props.item.pubDate.includes('Yesterday'))
        pubDate = props.item.pubDate
    else {
        pubDate = new Date(props.item.pubDate)
        pubDate = pubDate.toLocaleDateString()
    }

    return (
        <Tilt className="tilt">
            <div className="card-scans-va" style={{ backgroundImage: 'url(' + props.item.img + ')' }}>
                <a href={props.item.link} className="card-scans-va-content" target="_blank" rel="noopener noreferrer">
                    <p className="date">{pubDate}</p>
                    <h3>{props.item.title}</h3>
                    {props.item.site !== 'Anime Seikou' && <button>{props.item.lang}</button>}
                </a>
            </div>
        </Tilt>
    )
};

export default CardVa;