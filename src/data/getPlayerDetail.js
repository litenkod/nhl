import React from 'react';
import { Captain } from './getPlayerInfo';
import { PlayerStats } from './getPlayerStats';

export class PlayerDetail extends React.Component {

    render() {
        const { playerData } = this.props;
        return (
        <div className="modal">
            <button type="button" className="modal__close" onClick={this.props.selectPlayer.bind(null, null)}> X </button>
            <div className="modal__container">
                <div className="player-detail">
                    <img src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${playerData.person.id}@3x.jpg`} alt={playerData.person.fullName} />
                    <div className="info">
                        <span className="no">{playerData.jerseyNumber}</span>
                        <span className="name">{playerData.person.fullName}</span>
                        <span className="pos">{playerData.position.type}</span>
                        <Captain playerId={playerData.person.id} />
                    </div>
                    {
                        playerData
                        ?
                        <PlayerStats playerData={playerData}/>
                        :
                        null
                    }
                </div>
            </div>
        </div>
        );
    }
}
