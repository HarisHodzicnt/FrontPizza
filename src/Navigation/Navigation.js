import React, {useState, useEffect} from 'react'
import './TopNav.css';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Cart from '../Cart'
 const Navigation=(props)=>{

    const [openMenu, setMenu]=useState(false);
    const [openDialog, setOpen]=useState(false);
   
    const handleOpenMenu=(e)=>{
      setMenu(true)
    }

    const handleLogout=(e)=>{
       e.preventDefault();
      fetch(`https://localhost:44309/account/logout`,{
         method:'GET',
         headers:{
                     "Content-Type":'application/json',
                     'Accept': 'application/json'
                 },
         mode:'cors',
         }).then(x=>x.json()).then(y=>
             {
               console.log("dodje")
               localStorage.removeItem("loginData")
               localStorage.removeItem("Email")
               props.history.push("/signIn")
             })
       }  


    
    return(<div className={"topnav"} style={{position:'relative'}} id="myTopnav" style={{top:'0px'}} >
       {
          ((localStorage.getItem("Email") !== 'undefined') && (localStorage.getItem("Email") !== null)) ? 
                           <a href="" class="active" style={{float:'left', width:'200px'}} onClick={handleLogout}>Logout</a> :

                           <a href="" class="active" style={{float:'left', width:'200px'}}  onClick={()=>{props.history.push("/signIn")}}>SignIn</a>
       }
    <div class="topnav2">
         <a href="#" style={{background:'green', position:'flex'}} class="feedbacks"  onClick={()=>setOpen(true)} >
         <span style={{flex:'50%'}}>Cart </span><ShoppingCartIcon className="material-icons md-18"/> <span style={{flex:'50%'}}>| {props.cart?.length || ""}</span>
        </a>
            <a href="#contact" class="feedbacks">FeedBacks</a>
            <a href="#AboutUs">About us</a>
            <a href="#Contact">Contact</a>
            <a href="#Menu">Menu</a>
            <a href="/home">Home</a>

        <a href="#" class="icon" onClick={handleOpenMenu}>
         <MenuIcon className="material-icons md-18"/>
        </a>
    </div>
    <Cart items={props.cart} open={openDialog} setCart={props.setCart} close={()=>setOpen(!openDialog)} delete={props.deleteFromCart}/>
   { openMenu ?
               <div class="responsive" onClick={()=>setMenu(!openMenu)} >
                  <a href="#contact" class="feedbacks">FeedBacks</a>
                  <a href="#AboutUs">About us</a>
                  <a href="#Contact">Contact</a>
                  <a href="#Menu">Menu</a>
                  <a href="/home">Home</a>
               </div> : false
   }
  </div>)
}
export default Navigation