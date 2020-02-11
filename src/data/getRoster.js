
import React from 'react';
import './roster.scss';

import { Captain } from './getPlayerInfo';
import { PlayerStats } from './getPlayerStats';

export class GetRoster extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            team: [],
            playerId: {},
            prevTeamId: null,
            teamValues: null
        };
    }

    getTeamRoster = TEAM_ID => {
        if(TEAM_ID !== null && TEAM_ID !== undefined){
            const API = `https://statsapi.web.nhl.com/api/v1/teams/${TEAM_ID}?expand=team.roster`;
            fetch(API)
                .then(response => response.json())
                .then(data => {
                    this.setState({team: data.teams[0]})

                    const playerValue = require('./playerValue.json');
                    const teamValueList = playerValue.find( item => this.cleanName(item.teamName) === this.cleanName(data.teams[0].name));
                    this.setState({teamValues: teamValueList})

                    // console.log('teamValueList: ', teamValueList);
                    const compareArray = [teamValueList.player, data.teams[0]];
                    return compareArray;

                }).then((item) =>{

                    for (let i = 0; i < item[1].roster.roster.length; i++) {
                        const element = item[1].roster.roster[i];
                        const elmentPlayer = this.cleanName(element.person.fullName);
                        const match = item[0].find(item => this.cleanName(item.name) === elmentPlayer);
                        
                        if (match) {
                            element.value = match.value.replace(',','.').replace('MSEK','').trim();
                        } else{
                            element.value = null;
                        }
                    }
                    this.setState({team: item[1]})
                });
        }
    };
    
    cleanName(rawName) {
        var trimName = rawName.toLowerCase().replace(' ', '').replace('á', 'a').replace('å', 'a').replace('ä', 'a').replace('ö', 'o').replace('.', '').replace('é', 'e').split(' ').join('').split('.').join('');
        return trimName;
    }

    componentDidMount() {
        this.getTeamRoster(this.props.teamId);
    }

    componentDidUpdate(prevProps) {
        if (this.props.teamId !== prevProps.teamId) {
            this.getTeamRoster(this.props.teamId);
        }
    }

    render() {
        const { team } = this.state;
        var img = team.id !== undefined ? <img src={`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${team.id}.svg`} alt={team.name}/>: '';
        return (
            <section className="team">
                <div className="info">
                    <div className="header">
                        {img}
                        <h1>{team.name}</h1>
                    </div>
                    <a href={team.officialSiteUrl}>{team.officialSiteUrl}</a>
                </div>
                <Players team={team} teamSort={this.props.teamSort}/>
            </section>
        );
    }
}

function sortOrder(players, sortType) {

    let sortOrdered = null;
    if (sortType !== null && sortType !== undefined) {
        switch (sortType) {
            case 'Number':
                sortOrdered = players.sort((a, b) => parseInt(a.jerseyNumber) > parseInt(b.jerseyNumber) ? 1 : -1);
                break;        
            case 'Name':
                sortOrdered = players.sort((a, b) => a.person.fullName > b.person.fullName ? 1 : -1);
                break;
            case 'Position':
                sortOrdered = players.sort((a, b) => a.position.type > b.position.type  ? 1 : -1);
                break;        
            default:
                sortOrdered = players.sort((a, b) => parseInt(a.jerseyNumber) > parseInt(b.jerseyNumber) ? 1 : -1);
                break;
        }
        return sortOrdered;
    } else if(sortType === null){
        sortOrdered = players.sort((a, b) => parseInt(a.jerseyNumber) > parseInt(b.jerseyNumber) ? 1 : -1);
    }

}

class Players extends React.Component {

    playerStats = (event, playerId) =>{
        this.setState({
            playerId: event
        });
    }

    render() {
        const { team, teamSort } = this.props;
        var roster = [];
        if (team.roster !== null && team.roster !== undefined) {
            roster = team.roster.roster;
            sortOrder(team.roster.roster, teamSort);
        }

        return (
            <div className="grid roster-list">
                {roster.map(player =>
                    <div className="player" key={player.person.id} data-key={player.person.id}  >
                        <img src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${player.person.id}.jpg`} alt={player.person.fullName} />
                        <div className="info">
                            <span className="no">{player.jerseyNumber}</span>
                            <span className="name">{player.person.fullName}</span>
                            <span className="pos">{player.position.type}</span>
                            <Captain playerId={player.person.id} />
                        </div>
                        <PlayerStats playerId={player.person.id} position={player.position.code} teamName={team.name} playerValue={player.value} />
                    </div>
                )}
            </div>
        );
    }
}

