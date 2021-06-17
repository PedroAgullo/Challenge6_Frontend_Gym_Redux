import React from 'react';
import './Profile.css';


import MenuLateral from '../../components/MenuLateral/MenuLateral';
/* import Userdata from '../../components/Userdata/Userdata'; */

import { connect } from 'react-redux';
import DataProfile from '../../components/DataProfile/DataProfile';
import DataRoom from '../../components/DataRoom/DataRoom';
import DataJoin from '../../components/DataJoin/DataJoin';
import DataRoomMonitor from '../../components/DataRoomMonitor/DataRoomMonitor';
import DataJoinMonitor from '../../components/DataJoinMonitor/DataJoinMonitor';


const Profile = (props) => {

    const traeDatos = () => {
        switch (props.tipodatos) {
            case 'profile':

                return <DataProfile />

            case 'useroom':

                return <DataRoom />


            case 'joinuser':

                return <DataJoin />

            case 'monitoroom':
                return <DataRoomMonitor/>

            case 'joinmonitor':
                return <DataJoinMonitor/>

            default:

                return <DataProfile />
        }

    }

    return (
        <div>

            <div className="boxPerfilUsuario">
                <MenuLateral />
                <div className="datos">
                    {traeDatos()}
                </div>
            </div>


        </div>
    )

}

export default connect((state) => ({
    user: state.credentials.user,
    tipodatos: state.tipodatos
}))(Profile);