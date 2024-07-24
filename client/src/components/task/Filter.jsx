import React from 'react';

const Filter = ({ filter, setFilter }) => {
    return (
        <div className="filter">
            <button onClick={() => setFilter('All')} className={filter === 'All' ? 'active' : ' btn btn-secondary'}>All</button>
            <button onClick={() => setFilter('To Do')} className={filter === 'To Do' ? 'active' : ' btn btn-secondary'}>To Do</button>
            <button onClick={() => setFilter('In Progress')} className={filter === 'In Progress' ? 'active' : ' btn btn-secondary'}>In Progress</button>
            <button onClick={() => setFilter('Done')} className={filter === 'Done' ? 'active' : ' btn btn-secondary'}>Done</button>
        </div>
    );
};

export default Filter;