import React from 'react';
// import { Nav } from './Nav';
import { Page1 } from './Page1';


export class MainPage extends React.Component {
    render() {
        return (
            <div className="container">
                {/* <Nav/> */}
                <div className="grid">
                    <div className="col-12">
                        <Page1 />
                    </div>
                </div>
            </div>
        );
    }
}
