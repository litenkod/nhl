
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
                <div className="img-wrapper">
                    <img src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${playerData.person.id}.jpg`} alt={playerData.person.fullName} />
                </div>
                <div className="info">
                    <span className="no">{playerData.jerseyNumber}</span>
                    <span className="name">{playerData.person.fullName}</span>
                    <span className="pos">{playerData.position.type}</span>
                    <Captain playerId={playerData.person.id} />
                </div>
                <button className="link" onClick={this.props.selectPlayer.bind(null, playerData)}>
                    <svg id="icon-user" viewBox="0 0 32 32">
                        <path d="M18 22.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z"></path>
                    </svg>
                </button>
            </div>
        );
    }
}