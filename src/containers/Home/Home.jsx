import React from 'react';
import './Home.css';
import CarouselSlider from '../../components/Carousel/Carousel';
import HomeRoom from '../../components/HomeRoom/HomeRoom';
import HomePrice from '../../components/HomePrice/HomePrice';
import  Footer  from '../../components/Footer/Footer';






const Home = () => {
    return (
        <div className="HomeDiv">
           
            <CarouselSlider/>
            <HomeRoom/>
            <HomePrice/>
            <Footer/>
        </div>
    );
}
export default Home;