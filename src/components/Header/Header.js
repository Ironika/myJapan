import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as ROUTES from '../../routes';

import './Header.scss';
import logo from '../../assets/img/cerisier.png'

const Header = () => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    return (
        <nav className="header">
            <ul className="nav">
                <li>
                    <NavLink to={ROUTES.HOME} exact={true} activeClassName='active'>Home</NavLink>
                </li>
                <li>
                    <NavLink to={ROUTES.NEWS} activeClassName='active'>News</NavLink>
                </li>

                <li className="logo bounceIn"><img src={logo} alt="logo" /></li>

                <li>
                    <NavLink to={ROUTES.SCANS} activeClassName='active'>Scans</NavLink>
                </li>
                <li>
                    <NavLink to={ROUTES.ANIMES} activeClassName='active'>Animes</NavLink>
                </li>
                <li className="burger" onClick={(e) => setMenuIsOpen(!menuIsOpen)}>
                    <i className="fas fa-bars"></i>
                </li>
            </ul>
            <ul className={menuIsOpen ? 'nav-mobile menuIsOpen' : 'nav-mobile'}>
                <li>
                    <NavLink to={ROUTES.HOME} exact={true} activeClassName='active' onClick={(e) => setMenuIsOpen(false)}>
                        Home
                        <i className="fas fa-arrow-right"></i>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={ROUTES.NEWS} activeClassName='active' onClick={(e) => setMenuIsOpen(false)}>
                        News
                        <i className="fas fa-arrow-right"></i>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={ROUTES.SCANS} activeClassName='active' onClick={(e) => setMenuIsOpen(false)}>
                        Scans
                        <i className="fas fa-arrow-right"></i>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={ROUTES.ANIMES} activeClassName='active' onClick={(e) => setMenuIsOpen(false)}>
                        Animes
                        <i className="fas fa-arrow-right"></i>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
};

export default Header;