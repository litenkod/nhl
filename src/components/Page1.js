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

    updateID = (event, ID) =>{
        this.setState({
            teamId: ID
        });
    }

    updateSort = (event, sortType) =>{
        this.setState({
            teamSort: sortType
        });
    }

    render() {
        console.log('this.props: ', this.props);
        console.log('this.state: ', this.state);
        return (
        <div>
            <section className="page-header">
                <img src="https://www-league.nhlstatic.com/images/logos/league-dark/133.svg" alt="NHL"/>
                <h1>NHL 2018/19</h1>
            </section>
            <GetTeams updateTeamID={this.updateID.bind(null, 1)} temaId={this.state.teamId} />
            <SortList updateSortType={this.updateSort.bind(null, 1)} teamSort={this.state.teamSort} />
            <GetRoster teamId={this.state.teamId} teamSort={this.state.teamSort}/>
        </div>
        );
    }
}
