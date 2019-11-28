import React from 'react';

import './FlipCard.scss';


const FlipCard = () => {
    return (
        <section>
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <h1>Bienvenue sur MyJapan</h1>
                        <p> Je partegerais avec vous à travers ce site, différentes actualités, photos, musiques, mangas ou animés en relation avec le Japon.
                            <br/>
                            De plus ce site me permettra d'experimenter différentes technologies web et servira de portefolio pour la suite.
                            <br/>
                            J'éspère que l'experience vous plaira, et vous souhaite une agréable visite.
                        </p>
                        <blockquote>猿も木から落ちる <br/> "Même le singe tombe de l'arbre"</blockquote>
                    </div>
                    <div className="flip-card-back">
                        <h1>Welcome on MyJapan</h1>
                        <p> I will share with you through this site, various news, photos, music, manga or anime in relation with Japan.
                            <br/>
                            In addition, this site will allow me to experiment some web technologies and will serve me as a portfolio for the future.
                            <br/>
                            I hope that the experience will please you, and wish you a pleasant visit.
                        </p>
                        <blockquote>猿も木から落ちる <br/> "Even the monkey falls from the tree"</blockquote>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default FlipCard;