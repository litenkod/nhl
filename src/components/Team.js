import React from 'react';

import { GetRoster } from '../data/getRoster';
import { SortList } from '../data/sortList';

export class Team extends React.Component {
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
        const { teamId } = this.props;
        return (
        <div>
            <SortList updateSortType={this.updateSortOrder.bind(null, 1)} teamSort={this.state.teamSort} teamId={teamId} />
            <GetRoster teamId={teamId} teamSort={this.state.teamSort} />
        </div>
        );
    }
}
