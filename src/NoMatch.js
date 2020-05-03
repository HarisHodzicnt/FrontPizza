import React from 'react'

 const NoMatch=(props)=>{

    return <div style={{height:'85vh'}}><h2 style={{position:'absolute', top:'50%', left:'35%'}}>Not Correct url ---------------- >  <a href="#" onClick={()=>props.history.push("/home")}>go to home page </a></h2></div>
}

export default NoMatch