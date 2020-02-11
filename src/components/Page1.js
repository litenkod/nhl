import React from 'react';

import { GetTeams } from '../data/getTeams';
import { GetRoster } from '../data/getRoster';
import { SortList } from '../data/sortList';

export class Page1 extends React.Component {
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
                <h1>NHL 2018/19</h1>
            </section>
            <GetTeams updateTeamID={this.selectTeam.bind(null, 1)} temaId={teamId} />
            <SortList updateSortType={this.updateSortOrder.bind(null, 1)} teamSort={teamSort} teamId={teamId} />
            <GetRoster teamId={teamId} teamSort={teamSort}/>
        </div>
        );
    }
}
