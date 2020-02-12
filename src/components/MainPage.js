import React from 'react';
// import { Nav } from './Nav';
import { DefaultContainer } from './DefaultContainer';


export class MainPage extends React.Component {
    render() {
        return (
            <div className="container">
                {/* <Nav/> */}
                <div className="grid">
                    <div className="col-12">
                        <DefaultContainer />
                    </div>
                </div>
            </div>
        );
    }
}
