
import React from 'react';
import './SavedPlayers.scss';
export class SavedPlayers extends React.Component {

    componentDidUpdate(prevProps) {
        if (this.props.playersList !== prevProps.playersList) {
            console.log('update' );
            localStorage.setItem("savedPLayers", JSON.stringify(this.props.playersList));
        }
    }

    render() {

        const { playersList } = this.props;

        var player = [];
        var totalValue = 0;
        for (let i = 0; i < playersList.length; i++) {
            const element = playersList[i];
            var playerId = element[0];
            var fullName = element[1];
            var position = element[2];
            var value = element[3];
            var valueText = value !== null ? `${value} MSEK` : '';

            if (value > 0) {
                totalValue = (parseFloat(totalValue) + parseFloat(value)).toFixed(1);
            }
            
            player.push(
                <div key={playerId} className="player">
                    <div className="info">
                        <img src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${playerId}.jpg`} alt={fullName} />
                    </div>
                    <div className="player-stats">
                        <span>{fullName}</span>
                        <span>{position}</span>
                        <span className=" -txt-xl">{valueText}</span>
                    </div>
                    <button 
                        type="button" 
                        className="btn-action -active"
                        onClick={this.props.removePlayer.bind(null, playerId)}
                        >+
                    </button>
                </div>
            )
        }
        
        return (
            <section className={`saved-players ${player.length <= 0 ? '-hidden' : ''}`}>
                <div className="header">
                    <h3>Saved players</h3> <span className="total-value">Total value: <span>{totalValue}</span></span>
                </div>
                <div className="grid -col-6">
                    {player}
                </div>
            </section>
        );
    }
}
