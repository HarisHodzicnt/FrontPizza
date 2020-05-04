import React from 'react'
import './Header.css';


const Header=()=>{

    const email=localStorage.getItem("Email");
    console.log(email)
    return(<div style={{flexWrap:'wrap', display:'flex', height:'90vh'}}>

            <div className="headerText">
                <div style={{width:'90%' ,margin:'70px auto'}}>
                    <h4>Welcome to  DiCasa Pizzeria</h4>
                    <p>{email!='undefined' ? email : "" }</p>
                    Proven quality, and made on traditional cepepis.
                </div>
            </div>
            <div className="headerImage" style={{flex:'40%'}}>
                <img src="/Header.png" alt="Image is not free, i am not autor" />
            </div>

    </div>)
}

export default Header