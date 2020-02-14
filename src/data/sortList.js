
import React from 'react';
import './sortList.scss';

export class SortList extends React.Component {

    render() {

        let sortContainer = null;
        if(this.props.teamId) {
            var menuArray = ['Name', 'Number', 'Position']
            var menuItems = [];
            var sortOrder = this.props.teamSort !== null ? this.props.teamSort: 'Position';

            for (let index = 0; index < menuArray.length; index++) {
                const el = menuArray[index];
                menuItems.push(
                    <button 
                        className={el === sortOrder ? '-active' : null}
                        type="button" 
                        key={el} 
                        onClick={this.props.updateSortType.bind(null, el)} 
                        data-name={el}>
                        {el}
                    </button>
                )
            }

            sortContainer = 
                <section className="sort-list">
                    <nav>
                        {menuItems}
                    </nav>
                </section>;
        }

        return sortContainer;

    }
}
