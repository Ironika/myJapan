import React from 'react';

import './Loader.scss';
import loader from '../../assets/img/loader.png';

const Loader = () => (
    <div className="loader">
        <img src={loader} alt="loader"/>
    </div>
);

export default Loader;