import React from 'react';

import './FlipCard.scss';


const FlipCard = (props) => {
    return (
        <section>
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        {props.front}
                    </div>
                    <div className="flip-card-back">
                        {props.back}
                    </div>
                </div>
            </div>
        </section>
    )
};

export default FlipCard;