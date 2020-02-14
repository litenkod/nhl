import React from 'react';

import { GetRoster } from '../data/getRoster';
import { SortList } from '../data/sortList';
import { PlayerDetail } from '../data/getPlayerDetail';

export class Team extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            teams: [],
            teamId: null,
            teamSort: null,
            playerData: null,
        };
    }

    selectPlayer = (event, playerData) =>{
        if(playerData) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        this.setState({
            playerData: playerData
        });
    }

    updateSortOrder = (event, sortType) =>{
        this.setState({
            teamSort: sortType
        });
    }

    render() {
        const { teamId } = this.props;
        const { playerData } = this.state;
        console.log('playerId :', playerData);
        return (
            <div>
                <SortList updateSortType={this.updateSortOrder.bind(null, 1)} teamSort={this.state.teamSort} teamId={teamId} />
                <GetRoster teamId={teamId} teamSort={this.state.teamSort} selectPlayer={this.selectPlayer.bind(null, 1)} />
                {
                    playerData
                    ? 
                    (
                        <PlayerDetail playerData={playerData} selectPlayer={this.selectPlayer.bind(null, 1)} />
                    )
                    :
                    null
                }
            </div>
        );
    }
}
