import React from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ParallaxBanner } from 'react-scroll-parallax';

import './Home.scss';
import homescreen from '../../assets/img/homescreen.jpg'
import homescreen2 from '../../assets/img/homescreen2.jpg'

const Home = () => {
  return (
    <div className="Home">

        <ParallaxProvider>
                <ParallaxBanner className="homescreen" layers={[{ image: homescreen, amount: 0.5 }]} style={{height: '450px'}}></ParallaxBanner>
                <section>
                    <div className="presentation">
                        <h2>Bienvenue sur MyJapan</h2>
                        <p> Je partegerais avec vous à travers ce site, différentes actualités, photos, musiques, mangas ou animés en relation avec le Japon.
                            <br/>
                            De plus ce site me permettra d'experimenter différentes technologies web et servira de portefolio pour la suite.
                            <br/>
                            J'éspère que l'experience vous plaira, et vous souhaite une agréable visite.
                        </p>
                        <blockquote>猿も木から落ちる <br/> "Même le singe tombe de l'arbre"</blockquote>
                    </div>
                </section>
                <ParallaxBanner className="homescreen" layers={[{ image: homescreen2, amount: 0.5 }]} style={{height: '450px'}}></ParallaxBanner>
                <section>
                    <div className="news">
                      <h2>Last News</h2>

                    </div>
                </section>
        </ParallaxProvider>

    </div>
  );
}

export default Home;
