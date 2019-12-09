import React from 'react';

import './Loader.scss';
// import loaderPng from '../../assets/img/loader.png';
import loader from '../../assets/img/loader.gif';

// const LoaderPng = () => (
//     <div className="loader">
//         <img src={loaderPng} alt="loader"/>
//     </div>
// );

const Loader = (props) => (
    <div className="loader" style={props.style}>
        <img src={loader} alt="loader"/>
    </div>
);

export default Loader;