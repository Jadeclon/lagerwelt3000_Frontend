import React, { Component } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Nav = ({user}) => {

    const location = useLocation();

    return (
        <div className="nav">
            { <h4>{user.user}</h4>}
            {/* { console.log(location) } */}
            { location.pathname === "/home" && <Link to="/settings"><button className="black-btn"><i className="fa fa-gear"></i></button></Link> }
            { location.pathname === "/settings" && <Link to="/home"><button className="black-btn"><i className="fa fa-home"></i></button></Link> }
            { location.pathname === "/details" && <Link to="/home"><button className="black-btn"><i className="fa fa-home"></i></button></Link> }
        </div>
    );
}

export default Nav;