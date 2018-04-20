import React from 'react';
import { NavLink } from 'react-router-dom';

export default () => {
    return(
        <nav className="nav">
            <NavLink to="/" exact={true} activeClassName="selected">Home</NavLink>
            <NavLink to="/appPP" activeClassName="selected">Secret</NavLink>
            <NavLink to="/users" activeClassName="selected">Users</NavLink>
            {/*<NavLink to="/login" activeClassName="selected">Sing In</NavLink>*/}
        </nav>
    )
}