import React, { createContext , useState } from 'react';

// Create the context
const SearchContext = createContext();


// Create the provider component
export function SearchProvider({ children }) {
    const [isSearchIconClicked, setIsSearchIconClicked] = useState(false);

    
    return (
        <SearchContext.Provider value={{ isSearchIconClicked,setIsSearchIconClicked}}>
            {children}
        </SearchContext.Provider>
    );
}

export default SearchContext;