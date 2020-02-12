
import React from 'react';

import './teamList.scss';
// const helper = require('../_helper');
import helper from '../_helper'

const API = 'https://statsapi.web.nhl.com/api/v1/teams';

export class GetTeams extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            teams: [],
        };
    }

    componentDidMount() {
        fetch(API)
        .then(response => response.json())
        .then(data => {
            this.setState({ teams: data.teams })
        });
    }

    render() {
        const { teams } = this.state;

        return (
        <section>
            <nav className="team-list" ref="teamList">
                {helper.sortName(teams).map(team =>
                    <button
                        className={team.id === this.props.temaId ? '-active' : ''}
                        key={team.id} 
                        data-id={team.id} 
                        onClick={this.props.updateTeamID.bind(null, team.id)}>
                    <img src={`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${team.id}.svg`} alt={team.name}/>
                    {/* {team.name} */}
                    </button>
                )}
            </nav>
        </section>
        );
    }
}
