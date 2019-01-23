

// https://statsapi.web.nhl.com/api/v1/people/8480012/stats?stats=statsSingleSeason&season=20182019
// https://statsapi.web.nhl.com/api/v1/people/${this.props.playerId}/stats?stats=statsSingleSeason&season=20182019


import React from 'react';

export class PlayerStats extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            player: {}
        };
    }


    componentDidMount() {
        this.renderStats();
    }

    renderStats() {
        if(this.props.playerId !== null && this.props.playerId !== undefined){
            const API = `https://statsapi.web.nhl.com/api/v1/people/${this.props.playerId}/stats?stats=statsSingleSeason&season=20182019`;
            fetch(API)
                .then(response => response.json())
                .then(data => {
                    // this.setState({player: data.stats[0]})
                    // console.log('playerStats: ', data.stats[0]);
                });
        }
    }

    render() {

        return(
            <span className="player-info">
                {/* {this.state.player.captain === true ? <span className="cap">C</span> : ''}
                {this.state.player.alternateCaptain === true ? <span className="cap">A</span> : ''}
                {this.state.player.rookie === true ? <span className="rookie">Rookie</span> : ''} */}
            </span>

        );

    }
}
