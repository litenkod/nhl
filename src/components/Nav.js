
import React from 'react';
import './Nav.scss';

export class Nav extends React.Component {
    render() {
        return (
        <div className="main-nav">
            <label htmlFor="menu-button">menu</label>
            <input id="menu-button" type="checkbox" />
            <nav>
                <button type="button">Page 1</button>
                <button type="button">Page 2</button>
                <button type="button">Page 3</button>
            </nav>
        </div>
        );
    }
}