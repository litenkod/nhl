import React from 'react';
import './playerStats.scss'

export class PlayerStats extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playerStats: {},
            playerData: {},
            playerStatsSeasons: {},
            playerStatsPlayoff: {}
        };
    }

    componentDidMount() {
        this.getPlayerStats();
    }

    getPlayerStats() {
        const { playerData } = this.props
        this.setState({playerData: playerData})
        const playerId = playerData.person.id
        if(playerId!== null && playerId !== undefined){
            const API = `https://statsapi.web.nhl.com/api/v1/people/${playerId}?expand=person.stats&stats=yearByYear,yearByYearPlayoffs,careerRegularSeason&expand=stats.team&site=en_nhlNR`;
            fetch(API)
                .then(response => response.json())
                .then(data => {
                    // //Only NHL teams
                    let seasonStats = data.people[0].stats[0];
                    let yearByYearPlayoffs = data.people[0].stats[1];
                    const career = [seasonStats, yearByYearPlayoffs];
                    let total = [];
                    let temp;
                    for (let i = 0; i < career.length; i++) {
                        const item = career[i];
                        temp = item.splits.filter(item => {
                            return item.league.id === 133 ? true : false;
                        })
                        if(temp.length > 0) {
                            total.push({type: item.type.displayName, games: temp});
                        }
                    }
                    this.setState({
                        playerStats: total
                    });

                });
        }
    }

    render() {
        const { playerStats, playerData} = this.state;
        let stats = [];
        if(playerStats && playerData?.position?.code && playerStats?.length) {
            for (let i = 0; i < playerStats.length; i++) {
                stats.push(createTabel(playerStats[i], playerData.position.code));
            }
        }
        return (
            <div className="stats">
                {stats}
            </div>
        );
    }
}

function createTabel(data, pos) {

    let tableRows = [];
    let thead = 
        <tr>
            <th>Year</th>
            <th>Team</th>
            <th>Games</th>
            <th>Goals</th>
            <th>Assists</th>
            <th>Points</th>
        </tr>

    for (let i = 0; i < data.games.length; i++) {
        const item = data.games[i];

        if(pos !== 'G') {

            tableRows.push(
                <tr key={`tr_${item.season}_${i}`}>
                    <td className="--small">{item.season}</td>
                    <td>{item.team.name}</td>
                    <td>{item.stat.games}</td>
                    <td>{item.stat.goals}</td>
                    <td>{item.stat.assists}</td>
                    <td>{item.stat.points}</td>
                </tr>
                )
        } else {
            tableRows.push(
                <tr key={`tr_${item.season}_${i}`}>
                    <td className="--small">{item.season}</td>
                    <td>{item.team.name}</td>
                    <td>{item.stat.games}</td>
                    <td>{item.stat.goalAgainstAverage.toFixed(2)}</td>
                    <td>{item.stat.savePercentage.toFixed(3)}</td>
                    <td>{item.stat.shutouts}</td>
                    <td>{item.stat.wins}</td>
                    <td>{item.stat.losses}</td>
                    <td>{item.stat.ot}</td>
                </tr>
            )
            thead = 
                <tr>
                    <th>Year</th>
                    <th>Team</th>
                    <th>Games</th>
                    <th>GAA</th>
                    <th>Sv%</th>
                    <th>SO</th>
                    <th>Wins</th>
                    <th>Losses</th>
                    <th>OTL</th>
                </tr>
        }
    }
    
    const title = data.type.includes('Playoff') ? 'Playoff' : 'Regular seasons';
    const table = 
        <table key={data.type}>
            <caption>{title}</caption>
            <thead>
                {thead}
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>

    return table

}

