import React from 'react'
import "./ProductDiscoveryOptions.css"
import FilterContainer from '../../assets/FilterContainer/FilterContainer';
import SortContainer from '../../assets/SortContainer/SortContainer';
function ProductDiscoveryOptions() {
  return (
    <div className='productDiscovery-options'>
          <FilterContainer />
          <SortContainer />
    </div>
  )
}

export default ProductDiscoveryOptions