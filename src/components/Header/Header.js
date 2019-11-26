import React from 'react';
import { NavLink } from 'react-router-dom';
import * as ROUTES from '../../routes';

import './Header.scss';
import logo from '../../assets/img/cerisier.png'

const Header = () => (
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
        </ul>
    </nav>
);

export default Header;