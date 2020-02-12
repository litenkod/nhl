
import React from 'react';
import './roster.scss';

import { Captain } from './getPlayerInfo';
// import { PlayerStats } from './getPlayerStats';
// import helper from '../_helper';

export class Player extends React.Component {

    // playerStats = (event, playerId) =>{
    //     this.setState({
    //         playerId: event
    //     });
    // }

    render() {
       const { playerData } = this.props;

        return (
            <div className="player" key={playerData.person.id} data-key={playerData.person.id}  >
                <img src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${playerData.person.id}.jpg`} alt={playerData.person.fullName} />
                <div className="info">
                    <span className="no">{playerData.jerseyNumber}</span>
                    <span className="name">{playerData.person.fullName}</span>
                    <span className="pos">{playerData.position.type}</span>
                    <Captain playerId={playerData.person.id} />
                    <button type="button" className="link">i</button>
                </div>
                {/* <PlayerStats playerId={playerData.person.id} position={playerData.position.code} teamName={team.name} playerValue={playerData.value} /> */}

            </div>
        );
    }
}