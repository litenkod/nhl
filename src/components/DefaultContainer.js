import React from 'react';

import { GetTeams } from '../data/getTeams';
import { Team } from './Team';

export class DefaultContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            teams: [],
            teamId: null,
            teamSort: null,
        };
    }

    selectTeam = (event, ID) =>{
        this.setState({
            teamId: ID
        });
    }

    updateSortOrder = (event, sortType) =>{
        this.setState({
            teamSort: sortType
        });
    }

    render() {
        const { teamId, teamSort } = this.state;
        return (
        <div>
            <section className="page-header">
                <img src="https://www-league.nhlstatic.com/images/logos/league-dark/133.svg" alt="NHL"/>
                <h1>NHL 2010/20</h1>
            </section>
            <GetTeams updateTeamID={this.selectTeam.bind(null, 1)} temaId={teamId} />
            <Team teamId={teamId} teamSort={teamSort}  />
        </div>
        );
    }
}
