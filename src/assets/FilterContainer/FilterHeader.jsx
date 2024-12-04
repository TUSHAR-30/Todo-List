import React,{useContext, useEffect, useState} from 'react'
import getValidDateFormat from "../../utils.js"
import TasksContext from '../../Context/TasksContext.jsx';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function FilterHeader() {
    const {setFilterStartDate,setFilterEndDate,dateRange,setDateRange}=useContext(TasksContext)
    const [startDate, endDate] = dateRange;

    useEffect(()=>{
        const result=getValidDateFormat(...dateRange)
        //first convert the string into suitable format and then setFilterStartDate & setFilterEndDate
        setFilterStartDate(result[0] || "")
        setFilterEndDate(result[1]|| "")
    },[dateRange])
    return (
        <header>
            <h4>Filter by:</h4>
            <div className='datecontainer'>
                <span>Creation Date</span>
                <DatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => {
                        setDateRange(update);
                    }}
                    isClearable={true}
                />
            </div>

        </header>
    )
}

export default FilterHeader