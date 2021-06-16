import React from 'react';
import './Home.css';
import CarouselSlider from '../../components/Carousel/Carousel';
import HomeRoom from '../../components/HomeRoom/HomeRoom';
import HomePrice from '../../components/HomePrice/HomePrice';





const Home = () => {
    return (
        <div className="HomeDiv">
           
            <CarouselSlider/>
            <HomeRoom/>
            <HomePrice/>
          
        </div>
    );
}
export default Home;