import React from 'react';
import "./Carousel.css";
import PhotoGym from '../../images/fotoNuevaApertura.png';
import PhotoGym2 from '../../images/fotoPromoVerano.png';
import PhotoGym3 from '../../images/fotoSlider.png';
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
                 <Card className="card-wrap" style={{backgroundColor: "#ededf4", marginLeft: "3em"}} >
                    <Carousel autoplay effect="fade">
                        <div>
                            <img className= "PhotoSlider" style={{width: "90vw", height: "80vh", backgroundColor: "#ededf4"}} src={PhotoGym} alt =""/>
                        </div>
                        <div>
                            <img className= "PhotoSlider" style={{width: "90vw", height: "80vh", backgroundColor: "#ededf4"}} src={PhotoGym2} alt=""/>
                        </div>
                        <div>
                            <img className= "PhotoSlider" style={{width: "90vw", height: "80vh", backgroundColor: "#ededf4"}} src={PhotoGym3} alt=""/>
                        </div>
                    </Carousel>
                </Card>
            </div>
        );
    }
}
export default CarouselSlider;