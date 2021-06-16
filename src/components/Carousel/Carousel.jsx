import React from 'react';
import "./Carousel.css";
import PhotoGym from '../../images/gym8.jpg';
import PhotoGym2 from '../../images/gym3.jpg';
import PhotoGym3 from '../../images/gym4.jpg';
import 'antd/dist/antd.css'
import {Card,Row,Col,Carousel} from 'antd';


class CarouselSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
                 <Card className="card-wrap" style={{backgroundColor: "#ededf4"}} >
                    <Carousel autoplay effect="fade">
                        <div>
                            <img className= "PhotoSlider" style={{width: "100vw", height: "80vh", backgroundColor: "#ededf4"}} src={PhotoGym} alt =""/>
                        </div>
                        <div>
                            <img className= "PhotoSlider" style={{width: "100vw", height: "80vh", backgroundColor: "#ededf4"}} src={PhotoGym2} alt=""/>
                        </div>
                        <div>
                            <img className= "PhotoSlider" style={{width: "100vw", height: "80vh", backgroundColor: "#ededf4"}} src={PhotoGym3} alt=""/>
                        </div>
                    </Carousel>
                </Card>
            </div>
        );
    }
}
export default CarouselSlider;