import React, { useContext, useEffect, useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import "./Searchbar.css"
import SearchContext from '../../../Context/SearchContext';
function Searchbar() {

    const {isSearchIconClicked,setIsSearchIconClicked}=useContext(SearchContext)

    function handleSearchIcon() {
        setIsSearchIconClicked(!isSearchIconClicked)
        document.querySelector(".searchcontainer").classList.toggle("scaled");
    }

    return (
        <div className={`searchbar `} onClick={handleSearchIcon}>
            <div className={`searchbar-buttons ${isSearchIconClicked?"searchbar-active":""}`}>
                <IoSearchSharp size={23} className='searchbar-icon' />
                <RxCross2 size={23} className={`cancel-icon `} />
            </div>
        </div>
    )
}

export default Searchbar