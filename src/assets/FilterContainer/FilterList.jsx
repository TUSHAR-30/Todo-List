import React  from "react"

function FilterList({selectedFilter,handleFilterChange}) {
    return (
        <div className='filterby-list'>
            <div className={`filterby-listitem ${selectedFilter === "All Tasks" ? "checkedfilter" : ""}`}>
                <input type="radio"
                    id='All Tasks'
                    name="selectedFilterOption"
                    value="All Tasks"
                    onChange={handleFilterChange}
                    checked={selectedFilter === "All Tasks"}
                />
                <label htmlFor="All Tasks">All Tasks</label>
            </div>
            <div className={`filterby-listitem ${selectedFilter === "Completed" ? "checkedfilter" : ""}`}>
                <input
                    type="radio"
                    id='Completed'
                    name="selectedFilterOption"
                    value="Completed"
                    onChange={handleFilterChange}
                    checked={selectedFilter === "Completed"}
                />
                <label htmlFor="Completed">Completed</label>
            </div>
            <div className={`filterby-listitem ${selectedFilter === "Incompleted" ? "checkedfilter" : ""}`}>
                <input
                    type="radio"
                    id='Incompleted'
                    name="selectedFilterOption"
                    value="Incompleted"
                    onChange={handleFilterChange}
                    checked={selectedFilter === "Incompleted"}
                />
                <label htmlFor="Incompleted">Incompleted</label>
            </div>
        </div>
    )
}

export default FilterList