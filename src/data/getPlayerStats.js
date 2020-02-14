import React from 'react';
import './playerStats.scss'

export class PlayerStats extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playerStats: {}
        };
    }

    componentDidMount() {
        this.getPlayerStats();
    }

    getPlayerStats() {
        const { playerData } = this.props
        const playerId = playerData.person.id
        if(playerId!== null && playerId !== undefined){
            const API = `https://statsapi.web.nhl.com/api/v1/people/${playerId}?expand=person.stats&stats=yearByYear,yearByYearPlayoffs,careerRegularSeason&expand=stats.team&site=en_nhlNR`;
            fetch(API)
                .then(response => response.json())
                .then(data => {
                    const stats = data.people[0].stats;
                    this.setState({playerStats: stats})
                });
        }
    }

    render() {
        const { playerStats } = this.state;
        let stats = [];
        if(playerStats[0] !== undefined && playerStats[0] !== null) {
            stats.push(createTabel(playerStats[0]));
            stats.push(createTabel(playerStats[1]));
        }
        return (
            <div className="stats">
                {stats}
            </div>
        );
    }
}

function createTabel(data) {

    let tableRows = [];
    for (let i = 0; i < data.splits.length; i++) {
        const item = data.splits[i];

        if(item.league.id && item.league.id === 133){
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
        }
    }

    const title = data.type.displayName.includes('Playoff') ? 'Playoff' : 'Regular seasons';
    const table = 
        <table key={data.type.displayName}>
            <caption>{title}</caption>
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Team</th>
                    <th>Games</th>
                    <th>Goals</th>
                    <th>Assists</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>

    return table

}

