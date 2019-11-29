import React from 'react';

import './Description.scss';

const DescriptionVA = () => {
    return (
        <div className="description">
            <h2>My Bad !</h2>
            <p> Some pages may be long to load during the first visit.
                <br/>
                MyJapan simply scraps data on other websites and lists them.
                <br/>
                It is based on a so-called 'Client' technology, the process requires a certain amount of execution time
                <br/>
                *if the Dev talk to you, this site is exclusively develop with React
            </p>
            <blockquote>堪忍は一生の宝 <br/> "Patience is a treasure of life"</blockquote>
        </div>
    )
};

export default DescriptionVA;