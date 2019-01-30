
import React from 'react';
import './SavedPlayers.scss';

export class SavedPlayers extends React.Component {

    render() {
        const { playersList } =this.props

        var player = [];
        for (let i = 0; i < playersList.length; i++) {
            const element = playersList[i];
            console.log('element: ', element);
            var playerId = element[0];
            var fullName = element[1];
            var position = ' - ' + element[2];
            var value = element[3] !== null ? ` - ${element[3]}` : '-No data found-';
            player.push(
                <div key={element} className="player">
                    <div className="info">
                        <img src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${playerId}.jpg`} alt={fullName} />
                    </div>
                    <div className="player-stats">
                        <div className="score-wrapper">
                            <span>{fullName}</span>
                            <span>{position}</span>
                            <span>{value}</span>
                        </div>
                    </div>
                </div>
            )
        }
        
        return (
        <div className="team saved-players">
            <div className="grid">
                {player}
            </div>
        </div>
        );
    }
}
