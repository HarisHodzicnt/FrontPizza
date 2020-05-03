import React from 'react'
import './About.css';

const AboutUs=()=>{

    return(<div className="flex top" > 
            <div className="aboutImage" >
                <img src="/Customer.png" alt="Image is not free, i am not autor"/>
            </div>
            <div className="aboutText">
                <h3 style={{ margin:'0px'}}>About us</h3>
                <h5 style={{width:'90%', margin:'6vmin auto',  }}>
                                <p>DiCasa pizzeria has a proven history of
                happy customers.</p> We prepare our food
                based on traditional recepeis. 
                Which we inherited from our ancestors.

                </h5>
            </div>
         

    </div>)
}

export default AboutUs