import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {api} from './environment'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Chart(props) {

    let allOrders = JSON.parse(sessionStorage.getItem("cart"))
  const [message, setMessage]=useState(false);
  const [unlock, setUnlock] = useState(false);
  const handleSubmit=async ()=>{

   if(allOrders!=null)
      {
       

      let orderId=0;
       await fetch(`${api}/order`,{
            method:'POST',
            headers:{
                        "Content-Type":'application/json'
                    },
            mode:'cors',
            body:JSON.stringify({Id:0, Address:"" })
       }).then(x => x.json()).then(y => orderId = y.id);

      

        allOrders.map(async (order,index)=>{
            order.OrderId = orderId == 0 ? 0 : parseInt(orderId);
            order.Price = parseInt(order.Price);
          await fetch(`${api}/order/orderDetails`,{
            method:'POST',
            headers:{
                        "Content-Type":'application/json'
                    },
            mode:'cors',
            body:JSON.stringify(order)
            }).then(x=>x.json()).then(y=>
                {
                  console.log(y)
                  if(!y.message)
                  {
                    setMessage({name:"success", body:"Thank you for using our service."})
                    setTimeout(function(){
                      setMessage(false)
                      props.setCart(false)
                      sessionStorage.removeItem("cart")
                      props.close();
                    },2000)
                  }
                  else{
                    setMessage({name:"error", body:y.message})
                    setTimeout(function(){
                      setMessage(false)
                      props.close();
                    },2000)
                  }
                  
                }).catch(e=>console.log(e))
        })
      } 
    
  }

  let numberOrder=[]
  let totalCost=0;
  let headerToDisplay="Your order"
  //if cart is called from Admin
  if(props.admin)
  {
    allOrders=props.items
    headerToDisplay="All Orders"
  }

  return (
    <div>

      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.close}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"

      >
        {
          allOrders ? <div>
                                  <DialogTitle id="alert-dialog-slide-title" style={{textAlign:'center'}}><h1>{headerToDisplay}</h1></DialogTitle>
                                  {
                                    !props.admin ?  <p style={{width:'90%', margin:'0 auto', fontSize:'19px', marginTop:'-36px', textAlign:'right'}}>ps. 20$ + take the discount of 10%</p> : false
                                  }
                                 
                                </div> : false
        }
       
        <DialogContent style={{minWidth:'60vmin'}}>
          <DialogContentText id="alert-dialog-slide-description">
               {
                          allOrders ? allOrders.map((item, index) => {

                                                        if(numberOrder.indexOf(item.OrderId)==-1)
                                                           numberOrder.push(item.OrderId)

                                                        totalCost+=parseInt(item?.Price);
                                                          return <div style={{width:'50vmin', textAlign:'center'}}>
                                                              <hr/>
                                                                  {item.OrderId ? <h1>Narudzba: {item.OrderId}</h1> : false}
                                                                  <h3 style={{width:'70%', textAlign:'left'}}>{item?.Name}</h3>
                                                              <div >
                                                                  <div>
                                                                      <span><b>Size: </b> {item.Size}</span>
                                                                      <span style={{ marginLeft: '15px' }}><b>Quantity: </b> {item.Quantity}</span>
                                                                  </div>
                                                               
                                                                      <p><b>Aditional Comment: </b><br/> {item?.Aditional}</p>

                                                              </div>
                                                              <div>
                                                                  <span style={{textAlign:'left'}}>Price: {item?.Price} $</span><br/><br/>
                                                                  {
                                                                    !props.admin ? <Button onClick={()=>props.delete(index)} style={{padding:'5px 10px', color:'white', background:'red'}}>Delete</Button> : false
                                                                                   
                                                                  }
                                                                  
                                                              </div>
                                                              <hr/>

                                                          </div>
                                                    }) :
                                    <div style={{marginTop:'20px', fontSize:'3vmin', textAlign:'center'}}>No items yet</div>
                }
                
                {
                  (numberOrder && props.admin) ? numberOrder.map(number=>{ return <div style={{display:'flex', flexWrap:'wrap', width:'70%', margin:'0 auto'}}>
                                                                            <span style={{flex:'50%', textAlign:'left'}}>Narudzba: {number}</span>

                                                                            <div style={{flex:'50%', textAlign:'right'}}>
                                                                                <input type="checkbox" onChange={()=>setUnlock(true)}/>
                                                                                <Button disabled = {unlock ? true : false} onClick={()=>props.delete(allOrders.find(x=>x.OrderId==number))} style={{padding:'5px 10px', color:'white', background:'green'}}>Done</Button>
                                                                            </div>                                                               
                                                                      </div>
                                                                      }) : false
                }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <p style={{textAlign:'left', width:'60%', display:'inline-block'}}><span style={{fontWeight:'bold'}}>{totalCost>0 ? ` Total:  ${totalCost} $` : ""}</span></p>
         {
           !props.admin ? <div>
                              <Button onClick={props.close} color="primary">
                                          Cancel
                              </Button>
                              <Button onClick={handleSubmit} color="primary">
                                          Buy
                              </Button> <br/>
                          </div> : false
         } 
              
        </DialogActions>
        {
                    message ? <div style={{ borderBottom:message?.name=="error" ? '2px solid red' : '2px solid green', textAlign:'center',margin:'20 0 20 0', display:'block', fontSize:'30px'}}><span>{message.body}</span></div> : false
                    
                }
      </Dialog>
    </div>
  );
}