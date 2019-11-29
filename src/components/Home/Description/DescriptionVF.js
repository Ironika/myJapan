import React from 'react';

import './Description.scss';

const DescriptionVF = () => {
    return (
        <div className="description">
            <h2>Désolé !</h2>
            <p> Certaines pages peuvent être longue à charger lors de la première visite.
                <br/>
                MyJapan se contente de "scraper" (recupérer) des données sur d'autres sites Web et de les recenser.
                <br/>
                Ce dernier étant basé sur une technologie dite 'Client', le processus demande un certain temps d'execution.
                <br/>
                * Pour les intimes du dev, ce site est exclusivement developpé en React.
            </p>
            <blockquote>堪忍は一生の宝 <br/> "La patience est un trésor de la vie"</blockquote>
        </div>
    )
};

export default DescriptionVF;