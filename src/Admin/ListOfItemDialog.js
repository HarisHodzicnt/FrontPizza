import React, { useEffect,useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Pizza from '../Orders/Pizza';
import Cart from '../Cart'
import { api, apiImage } from '../environment'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ListOfItems(props) {

    const [orders, setOrders]=useState([])
    const [cartOpen, setCartClose]=useState(false)

    const deleteItem=(id)=>{
        fetch(`${api}/food/delete/${id}`,{
            method:"GET",
            header:{
                "Content-Type":'application/json'
            },
            mode:"cors"
        }).then(x=>x.json()).then(async y=>{
                    console.log(y)
                    await props.getItems();
              })  
 
    }

 


    const getOrders=async ()=>{
      fetch(`${api}/order`,{
          method:"GET",
          header:{
              "Content-Type":'application/json'
          },
          mode:"cors"
      }).then(x=>x.json()).then(y=>{

         let allOrders= y.map(order=>{
                              if(order.length>0)
                                      {
                                        console.log(order)
                                        let orderByUser=order.map(x=>{

                                              const ob={}
                                              Object.entries(x).map(([prop,value])=>{
                                              ob[prop.substring(0, 1).toUpperCase() + prop.substring(1)]=value;
                                              })
                                              console.log(ob);
                                              return ob;

                                        })
                                        return [...orderByUser];
                                      }                      
                 })  
            
            allOrders=allOrders.filter(x=>x != undefined)
            console.log(allOrders)
            setOrders(allOrders.flat());

      })
  }

    useEffect(()=>{
         getOrders();
    },[])
 
  const handleDelete=(order)=>{
    fetch(`${api}/order/delete/${order.OrderId}`,{
      method:"GET",
      header:{
          "Content-Type":'application/json'
      },
      mode:"cors"
  }).then(x=>x.json()).then(y=>{getOrders()});
  }

  let headerToDisplay="YourOrder"
  let totalCost=0;

  if(props.admin)
  {
    headerToDisplay="List Of Items"
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
        <DialogTitle id="alert-dialog-slide-title" style={{textAlign:'center'}}><h1>{headerToDisplay}</h1></DialogTitle>
        {!props.admin ? <p style={{width:'90%', margin:'0 auto', fontSize:'19px', marginTop:'-36px', textAlign:'right'}}>ps. 20$ + take the discount of 10%</p> : false}

        <DialogContent style={{minWidth:'60vmin'}}>
          <DialogContentText id="alert-dialog-slide-description">
               
               {
                 props.openOrders ? <div>
                                        {
                                          orders  ? <Cart close={props.close} items={orders} admin={true} open={props.open} setCart={props.setCart} delete={(index)=>handleDelete(index)}/> : false
                                        }
                                  </div>  :
                 
                 
                                  <div>
                                    {
                                      props.items?.map(item=>{
                                          console.log(item)
                                          return <Pizza admin={props.admin} item={item} addToCheckOut={(hej)=>console.log(hej)} delete={()=>deleteItem(item.Id)} edit={()=>props.editItem(item)} setPizza={(hej)=>console.log(hej)} image={item?.PhotoPath ? `${apiImage}/Images/${item?.PhotoPath}` : "https://via.placeholder.com/640x360"}/>
                                      })
                                    }
                              </div> 
                             
               }
               
               
          </DialogContentText>
        </DialogContent>
        <DialogActions>
         

         {
           !props.admin ? <div>
                                <p style={{textAlign:'left', width:'60%', display:'inline-block'}}><span style={{fontWeight:'bold'}}>{totalCost>0 ? ` Total:  ${totalCost} $` : ""}</span></p>
                                <Button onClick={props.navigateHome} color="primary">
                                  Home
                                </Button>
                                <Button onClick={props.close} color="primary">
                                  Add More
                                </Button>
                          </div> : false
         } 
               
        </DialogActions>
      </Dialog>
    </div>
  );
}