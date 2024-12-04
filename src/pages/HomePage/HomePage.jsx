import React from 'react'
import SearchContainer from '../../assets/SearchContainer/SearchContainer'
import Header from '../../components/Header/Header'
import Greetings from '../../components/Greetings/Greetings'
import ProductDiscoveryOptions from '../../components/ProductDiscoveryOptions/ProductDiscoveryOptions'
import ProductDiscoveryResults from '../../components/ProductDiscoveryResults/ProductDiscoveryResults'
import AddTask from '../../components/AddTask/AddTask'
import Tasks from '../../components/Tasks/Tasks'
import "./HomePage.css"

function HomePage() {
    return (
        <div className='homepage'>
            <div className="homepage-content">
                <SearchContainer />
                <Header />
                <Greetings />
                <ProductDiscoveryOptions />
                <ProductDiscoveryResults />
                <AddTask />
                <Tasks />
            </div>
        </div>
    )
}

export default HomePage