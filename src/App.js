import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Navigation from './Navigation/Navigation'
import Header from './Header/Header'
import AboutUs from './About/About'
import OrderForm from './Orders/OrderForm'
import Footer from './Footer/Footer'
import SignInComponent from './SignIn'
import SignUpComponent from './SignUp'
import Admin from './Admin/Admin'

import NoMatch from './NoMatch'
function App() {

  const [cart, setCart]=useState(JSON.parse(sessionStorage.getItem("cart")) || [])
  const [isLoggedIn, setLoggedIn]=useState(localStorage.getItem("loginData"))
    const [openMenu, setMenu] = useState(localStorage.getItem(false))

  sessionStorage.setItem("cart",JSON.stringify(cart));


  return (
    <div className="App">
      <Router>
              <header className="App-section-header ">
                  <Route render={(props) => <Navigation {...props} isSignIn={isLoggedIn} openMenu={openMenu} setMenu={() => setMenu(!openMenu)} cart={cart} setCart={setCart} deleteFromCart={(index) => setCart(cart.splice(index, 1))} />} />
        </header>
              <section className="App-section-main" onClick={() => setMenu(false)}>
        <Switch>
        <Route path="/admin" component={Admin}></Route>
        <Route  path="/signIn" render={(props)=><SignInComponent {...props} setSignIn={(user)=>{setLoggedIn(user)}}/>}/>
        <Route path="/register" render={(props)=><SignUpComponent {...props} setSignIn={(user)=>{setLoggedIn(user)}}/>}/>
        <Route path="/(|home)/">
          <Header/>
          <hr id="AboutUs"/>
          <AboutUs/>
          <hr style={{margin:'50px auto'}} id="Menu"/>
                          <OrderForm setCartFn={(item) => { setCart([...cart, item]) }} deleteFromCart={(index) => setCart(cart.splice(index, 1))} />
        </Route>
        <Route component={NoMatch}/>
        </Switch>
        </section>
        <footer className="App-section ">
        <Route component={Footer}/>
        </footer>
      </Router>
    </div>
  );
}

export default App;
