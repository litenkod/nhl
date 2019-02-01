
import React from 'react';
import './sortList.scss';

export class SortList extends React.Component {

    render() {

        var menuArray = ['Name', 'Number', 'Position']
        var menuItems = [];
        var sortOrder = this.props.teamSort !== null ? this.props.teamSort: 'Number';
        for (let i = 0; i < menuArray.length; i++) {
            const el = menuArray[i];
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
        return (
            <section className="sort-list">
                <span>Sort: </span>
                <nav>
                    {menuItems}
                </nav>
            </section>
        );
    }
}