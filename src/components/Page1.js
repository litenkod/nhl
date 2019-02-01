import React from 'react';

import { GetTeams } from '../data/getTeams';
import { GetRoster } from '../data/getRoster';
import { SortList } from '../data/sortList';
import { SavedPlayers } from './SavedPlayers';
import { ErrorMsg } from './ErrorMsg';

export class Page1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            teams: [],
            teamId: null,
            teamSort: null,
            savedPlayersArray: [],
            errorMsgArray : [],
        };
    }

    componentDidMount () {
        // Check if localstorage has savedPlayers. Used in SavedPlayers.js
        var storedPlayers = JSON.parse(localStorage.getItem('savedPLayers'));
        if(storedPlayers){
            this.setState({
                savedPlayersArray: storedPlayers,
            })
        }
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
        const savedPlayersState = [...this.state.savedPlayersArray]
        let newPlayer = null;
        newPlayer = savedPlayersState.find( item => item[0] === playerID[0]);
        this.setState({ errorMsgArray: []})
        if (!newPlayer) {
            if(this.state.savedPlayersArray.length <= 5){
                this.setState({
                    savedPlayersArray: [...savedPlayersState, playerID],
                })
            }else{
                this.setState({
                    errorMsgArray: [{
                        title:'Max 6 players',
                        subTitle: '(3 forwards - 2 defensmen - 1 goalie)',
                        text: 'remove a player before adding a new.'
                    }]
                })
            }
        }
    }

    removePlayer = (event, playerID) =>{
        const removeItem = this.state.savedPlayersArray.filter(item => item[0] !== playerID);
        this.setState({
            errorMsgArray: [],
            savedPlayersArray: removeItem,
        })
    }

    render() {

        const { savedPlayersArray, teamId, teamSort, errorMsgArray } = this.state;
        return (
        <div>
            <section className="page-header">
                <img src="https://www-league.nhlstatic.com/images/logos/league-dark/133.svg" alt="NHL"/>
                <h1>NHL 2018/19</h1>
            </section>

            <SavedPlayers 
                playersList={savedPlayersArray}
                removePlayer={this.removePlayer.bind(null, 1)} />

            <GetTeams 
                updateTeamID={this.selectTeam.bind(null, 1)} 
                temaId={teamId} />

            <SortList 
                updateSortType={this.updateSortOrder.bind(null, 1)} 
                teamSort={teamSort} />

            <GetRoster 
                teamId={teamId} 
                teamSort={teamSort} 
                savePlayer={this.savedPlayers.bind(null, 1)} 
                savedPlayers={savedPlayersArray}
                removePlayer={this.removePlayer.bind(null, 1)} />

            <ErrorMsg  errorMsgArray={errorMsgArray}/>
        </div>
        );
    }
}
