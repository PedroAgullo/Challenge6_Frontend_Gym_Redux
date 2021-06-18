import React from 'react';
import QRCode from "react-qr-code";


function Code() {

  let user = JSON.parse(localStorage.getItem('dataUser'));


  return (
    <div className="App">
          
      <header className="App-header">
        <QRCode value={user.name, user.email, user.token} size={256} bgColor="#ededf4;" fgColor="#fff" level="H" />
      </header>
    </div>
  );
}

export default Code;