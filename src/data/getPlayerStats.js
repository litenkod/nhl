

// https://statsapi.web.nhl.com/api/v1/people/8480012/stats?stats=statsSingleSeason&season=20182019
// https://statsapi.web.nhl.com/api/v1/people/${this.props.playerId}/stats?stats=statsSingleSeason&season=20182019


import React from 'react';

export class PlayerStats extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            playerStats: {}
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
                    if(data.stats[0].splits[0] !== undefined){
                        this.setState({playerStats: data.stats[0].splits[0].stat})
                    }else{
                        console.log('data.stats[0]: ', data.stats[0]);
                    }
                });
        }
    }
    

    calcScore(playerStats, pos) {
            var goalMod = 2;
            var assMod = 1;
            var pimMod = 0.5;
            var gwgMod = 2;
            var shgMod = 2;
            if(pos === 'D'){
                goalMod = 4;
                assMod = 2;
                gwgMod = 3;
                shgMod = 3;
            }

            var goalPoints = playerStats.goals * goalMod;
            var assPoints = playerStats.assists * assMod;
            var pimPoints = Math.floor(playerStats.pim * pimMod);
            var gwgPoints = playerStats.gameWinningGoals * gwgMod;
            var shgPoints = playerStats.shortHandedGoals * shgMod;

            var totalPoints = goalPoints + assPoints + pimPoints + gwgPoints + shgPoints;

            return totalPoints
        }

    render() {

        var { playerStats } = this.state;
        console.log('playerStats :', playerStats);
        var { position, playerId, playerValue } = this.props;

        // console.log('playerValue: ', playerValue);

        
        var score = this.calcScore(playerStats, position)
        var valuePerPoint = null
        var player = [];
        if(position === 'G'){
            player.push(
                <div className="no-stats" key={playerId}> No stats available</div>
            )
        } else{

            var playerPoints = [];
            if (score) {
                playerPoints.push(
                    <span key={playerId + '_score'} className="totalScore">TotalScore: <span className=" -txt-l">{score}</span></span>
                )
            }
            if (playerValue !== null){
                playerValue += ' MSEK'
                playerPoints.push(
                    <span key={playerId + '_playerValue'} className="playerValue"><span className=" -txt-xl">{playerValue}</span></span>
                )
            }else{
                playerPoints.push(
                    <span>-No data found-</span>
                )
            }
            valuePerPoint = (parseInt(score)/parseFloat(playerValue)).toFixed(1);
            if (valuePerPoint >= 0) {
                playerPoints.push(
                    <span key={playerId + '_valuePerPoint'} className="valuePerPoint">Points/MSEK <span className=" -txt-xl">{valuePerPoint}</span></span>
                )
            }

            player.push(
                <div key={playerId}>
                    <span className="games">GP{playerStats.games} </span>
                    <span className="goal">G{playerStats.goals} </span>
                    <span className="assists">A{playerStats.assists} </span>
                    <span className="points">P{playerStats.points} </span>
                    <span className="gameWinningGoals"> - GWG{playerStats.gameWinningGoals} </span>
                    <span className="shortHandedGoals">SHG{playerStats.shortHandedGoals} </span>
                    <span className="pim">PIM{playerStats.pim}</span>
                    {/* <div className="score-wrapper">
                        {playerPoints}
                    </div> */}
                </div>
            )
        }

        return(
            <div className="player-stats">
                {player}
            </div>

        );

    }
}
