import React from 'react';

import { GetTeams } from '../data/getTeams';
import { GetRoster } from '../data/getRoster';
import { SortList } from '../data/sortList';
import { SavedPlayers } from './SavedPlayers';

export class Page1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            teams: [],
            teamId: null,
            teamSort: null,
            savedPlayers: [],
        };
    }

    selectTeam = (event, ID) =>{
        this.setState({
            teamId: ID
        });
    }

    updateSortOrder = (event, sortType) =>{
        this.setState({
            teamSort: sortType
        });
    }

    savedPlayers = (event, playerID) =>{
        const savedPlayersState = [...this.state.savedPlayers]
        let newPlayer = null;
        newPlayer = savedPlayersState.find( item => item[0] === playerID[0]);
        if (!newPlayer) {
            this.setState({
                savedPlayers: [...savedPlayersState, playerID] 
            })
        }
        if(savedPlayersState.length === 5){
            console.log('max item 6');
        }
    }

    render() {

        return (
        <div>
            <section className="page-header">
                <img src="https://www-league.nhlstatic.com/images/logos/league-dark/133.svg" alt="NHL"/>
                <h1>NHL 2018/19</h1>
            </section>
            <SavedPlayers playersList={this.state.savedPlayers} />
            <GetTeams updateTeamID={this.selectTeam.bind(null, 1)} temaId={this.state.teamId} />
            <SortList updateSortType={this.updateSortOrder.bind(null, 1)} teamSort={this.state.teamSort} />
            <GetRoster teamId={this.state.teamId} teamSort={this.state.teamSort} savePlayer={this.savedPlayers.bind(null, 1)} />
        </div>
        );
    }
}
