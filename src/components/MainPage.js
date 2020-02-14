import React from 'react';
import { DefaultContainer } from './DefaultContainer';


export class MainPage extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="grid">
                    <div className="col-12">
                        <DefaultContainer />
                    </div>
                </div>
            </div>
        );
    }
}
