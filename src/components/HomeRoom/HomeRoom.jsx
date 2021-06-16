import React from 'react';
import "./HomeRoom.css";
import PhotoRoom1 from '../../images/zumba.png';
import PhotoRoom2 from '../../images/crossfit.png';
import PhotoRoom3 from '../../images/salsa.png';
import PhotoRoom4 from '../../images/spinning.png';
import PhotoRoom5 from '../../images/pilates.png';
import PhotoRoom6 from '../../images/boxeo.png';



const HomeRoom = (props) => {

    return (
      
        <div >
            <div className="titleHomeDiv">
                <h1 className="titleHomeText">PUEDES ENCONTRAR ESTAS CLASES</h1>
            </div>
            <div className="RoomHome">
                <div className="cardHome">
                    <div className="titleRoomClassCard"><h5>ZUMBA</h5></div>
                    <img className="PhotoRoom"  src={PhotoRoom1}/>
                </div>
                <div className="cardHome">
                    <div className="titleRoomClassCard"><h5>CROSSFIT</h5></div>
                    <img className="PhotoRoom"  src={PhotoRoom2}/>
                </div>
                <div className="cardHome">
                    <div className="titleRoomClassCard"><h5>SALSA</h5></div>
                    <img className="PhotoRoom"  src={PhotoRoom3}/>
                </div>
                <div className="cardHome">
                    <div className="titleRoomClassCard"><h5>SPINNING</h5></div>
                    <img className="PhotoRoom"  src={PhotoRoom4}/>
                </div>
                <div className="cardHome">
                    <div className="titleRoomClassCard"><h5>PILATES</h5></div>
                    <img className="PhotoRoom"  src={PhotoRoom5}/>
                </div>
                <div className="cardHome">
                    <div className="titleRoomClassCard"><h5>BOXEO</h5></div>
                    <img className="PhotoRoom"  src={PhotoRoom6}/>
                </div>
            </div>
                
    
        </div>

 
    );
  };
  export default HomeRoom;