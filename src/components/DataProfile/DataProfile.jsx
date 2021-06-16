
import './DataProfile.css';
// import PhotoProfile from '../../images/defaultFoto.png';
import PhotoProfile from '../../images/defaultFoto2.png';
import moment from 'moment';
import { connect } from 'react-redux';
import React from 'react';


const DataProfile = (props) => {

    let user = props.credentials.user;   

    return (
        <div>
            <h1>DATOS DEL USUARIO</h1>
            <div className="boxDataUser">
                
                <div className="infoUser1">
                    <div className="fotoUser"><img id="foto" src={PhotoProfile} alt="Profile photo" height= "100" width="100" /></div>
                    <div className="empty"></div>
                                            
                </div>

                <div className="infoUser2">
                    <input className="inputBaseUser" type="text" name="name"  placeholder={user.name} size="34" lenght='30'></input>
                    <input className="inputBaseUser" type="text" name="lastName1"  placeholder={user.lastName1} size="34" lenght='30' ></input>
                    <input className="inputBaseUser" type="text" name="lastName2"  placeholder={user.lastName2} size="34" lenght='30'></input>
                    <input className="inputBaseUser" type="text" name="email"  placeholder={user.email} size="34" lenght='30'></input>
                    <input className="inputBaseUser" type="password" name="password"  placeholder="************" size="34" lenght='8'></input>
                    <input className="inputBaseUser" type="password" name="password"  placeholder="************" size="34" lenght='8'></input>

                </div>

                <div className="infoUser3">
                    <input className="inputBaseUser" type="text" name="address"  placeholder={user.address} size="34" lenght='30'></input>
                    <input className="inputBaseUser" type="text" name="city"  placeholder={user.city} size="34" lenght='30'></input>
                    <input className="inputBaseUser" type="text" name="country"  placeholder={user.country} size="34" lenght='30'></input>
                    <input className="inputBaseUser" type="text" name="dni"  placeholder={user.dni} size="34" maxlenght='9' ></input>
                    <input className="inputBaseUser" type="text" name="telephone"  placeholder={user.telephone} size="34" lenght='9'></input>
                    <input className="inputBaseUser" type="text" name="birthday" placeholder={moment(user.birthday).format('L')} ></input>
                </div>
                    

            </div>
            
        </div>
    )
}

export default connect((state)=>({
    credentials:state.credentials,
}))(DataProfile);