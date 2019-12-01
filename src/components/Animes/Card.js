import React from 'react';
import Tilt from 'react-tilt';

import './Card.scss';


const Card = (props) => {
    return (
        <Tilt className="tilt-anime">
            <div className="card-anime" style={{ backgroundImage: 'url(' + props.item.img + ')' }}>
                <a href={props.item.link} className="card-anime-content" target="_blank" rel="noopener noreferrer">
                    <h3>{props.item.title}</h3>
                    <button>{props.item.site}</button>
                </a>
            </div>
        </Tilt>
    )
};

export default Card;