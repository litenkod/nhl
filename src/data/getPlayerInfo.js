
import React from 'react';

export class Captain extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            player: {}
        };
    }


    componentDidMount() {
        this.getCaptainData();
    }

    getCaptainData() {
        if(this.props.playerId !== null && this.props.playerId !== undefined){
            const API = `https://statsapi.web.nhl.com/api/v1/people/${this.props.playerId}/`;
            fetch(API)
                .then(response => response.json())
                .then(data => {
                    this.setState({player: data.people[0]})
                });
        }
    }

    render() {

        return(
            <span className="player-info">
                {this.state.player.captain === true ? <span className="cap">C</span> : ''}
                {this.state.player.alternateCaptain === true ? <span className="cap">A</span> : ''}
                {this.state.player.rookie === true ? <span className="rookie">Rookie</span> : ''}
            </span>

        );

    }
}
