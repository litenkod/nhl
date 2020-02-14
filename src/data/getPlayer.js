
import React from 'react';
import './roster.scss';

import { Captain } from './getPlayerInfo';

export class Player extends React.Component {

    updatePlayerID = (event, sortType) =>{
        this.setState({
            teamSort: sortType
        });
    }
    render() {
       const { playerData } = this.props;

        return (
            <div className="player" key={playerData.person.id} data-key={playerData.person.id}  >
                <button className="link" onClick={this.props.selectPlayer.bind(null, playerData)}>
                    <img src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${playerData.person.id}.jpg`} alt={playerData.person.fullName} />
                </button>
                <div className="info">
                    <span className="no">{playerData.jerseyNumber}</span>
                    <span className="name">{playerData.person.fullName}</span>
                    <span className="pos">{playerData.position.type}</span>
                    <Captain playerId={playerData.person.id} />
                </div>
            </div>
        );
    }
}