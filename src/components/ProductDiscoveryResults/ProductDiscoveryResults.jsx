import React, { useContext } from 'react'
import { convertDateFormat } from "../../utils.js"
import { MdOutlineCancel } from "react-icons/md";
import TasksContext from '../../Context/TasksContext.jsx'
import "./ProductDiscoveryResults.css"
function ProductDiscoveryResults() {

  const { selectedFilter , filterStartDate, filterEndDate, selectedSort, setSelectedSort , setFilterStartDate ,setFilterEndDate , setDateRange } = useContext(TasksContext)
  return (
    <div className='productdiscovery-results'>
      <div className='primary-productdiscovery-results'>
        <h2>{selectedFilter}</h2>
      </div>
      <div className='secondary-productdiscovery-results'>
        {
          filterStartDate && (
            <div>
              <span>
                {`${convertDateFormat(filterStartDate)} - `}
                {convertDateFormat(filterEndDate)}
              </span>
              <MdOutlineCancel size={16} className='cancelResult' onClick={()=>{ setDateRange([null,null]);   setFilterStartDate("") ; setFilterEndDate("")  }}/>
            </div>
          )
        }
        {
          selectedSort && (
            <div>
              <span>{selectedSort}</span>
              <MdOutlineCancel size={16} className='cancelResult' onClick={()=>setSelectedSort("")}/>
            </div>
          )
        }
        {
          !filterStartDate && !selectedSort && (
            <h4 style={{opacity:'0.6'}}>You can also apply filtering and sorting on tasks...</h4>
          )
        }
      </div>
    </div>
  )
}

export default ProductDiscoveryResults