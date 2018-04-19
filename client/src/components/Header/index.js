import  React from 'react';
import Menu from '../Menu';
import Auth from '../../components/Auth';
import logo from '../../assets/img/logo.svg';

export default () => {
    return(
        <header >
            <Auth />
            <div className="App-header">
                <div>
                    <img className="img_logo" src={logo}/>
                </div>
                <h1 className="App-title">Weather in the town</h1>
                <Menu/>
            </div>
        </header>
    )
}