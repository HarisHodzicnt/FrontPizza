import React, { useState,useEffect } from 'react'
import './OrderForm.css';
import Pizza from './Pizza';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  
  
const OrderForm=(props)=>{

    useEffect(()=>{
        getItems();
   },[])

    
    const getItems=async ()=>{
        fetch("https://localhost:44309/food",{
            method:"GET",
            header:{
                "Content-Type":'application/json'
            },
            mode:"cors"
        }).then(x=>x.json()).then(y=>{

           const items= y.map(item=>{
                const ob={}
                Object.entries(item).map(([prop,value])=>{
                  if(prop=="id")
                    prop="foodId"
                 ob[prop.substring(0, 1).toUpperCase() + prop.substring(1)]=value;
                })
                console.log(ob);
                return ob;

              })  

              setItems(items);
 
        })
    }

    


    const classes=useStyles();

    const [items, setItems]=React.useState();

    const [selectedItem, setItem] = React.useState({});

    
      const handleChange = (event) => {
        const id = event.target.id;
        setItem({
          ...selectedItem,
          [id]: event.target.value,
        });
      };

      const [succMessage, setSuccesMess]=useState();
      const [error, setError]=useState();

      const addToCart = () => {
        
        
        const errorMess=(prop)=>{
            setError("All fields are required");
            setTimeout(function(){
              setError(null)
            }, 2000)
            return;
          }

          if(selectedItem?.Name && selectedItem?.Quantity)
          {
              props.setCartFn(selectedItem)
              setSuccesMess(true)
              setItem({...selectedItem, Quantity:null, Size:null, Name:""})
              setTimeout(()=>{
                  setSuccesMess(false);
              },2000)
              return;
          }

          errorMess();
         
                  
      };

      console.log(selectedItem)
    return(<div className="flex" style={{flexWrap:'wrap', marginTop:'100px'}}>

            <div className="orderForm">
                <h2 style={{width:'90%' }}>
                    Order Details
                </h2>
                <form style={{width:'80%', textAlign:'center', margin:'0 auto'}}>
                <TextField id="Name" label={ selectedItem?.Name || "Choose item"} variant={selectedItem?.Name ? "outlined" : "filled"} disabled  fullWidth  style={{marginTop:'70px', background:selectedItem?.Name ? "rgba(16, 168, 16, 0.7)" : 'inherit'}}/>

                <FormControl variant="filled" className={classes.formControl} style={{marginRight:'30px', marginTop:'20px'}}>
                        <InputLabel htmlFor="filled-age-native-simple" >SIZE</InputLabel>
                        <Select
                        value={selectedItem?.Size ? selectedItem.Size : ""}
                        native
                        onChange={handleChange}
                        inputProps={{
                            name: 'SIZE',
                            id: 'Size',
                        }}
                        >
                        <option aria-label="None" value="" />
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                        <option value="Jumbo">Jumbo</option>
                        </Select>
                </FormControl>

             
                <TextField id="filled-basic" label="QUANTITY" type="number" className={classes.formControl} style={{marginLeft:'30px', width:'30px', marginTop:'20px'}} 
                       value={selectedItem?.Name ? selectedItem.Quantity : ""} placeholder="4 " id="Quantity" variant="filled"  onChange={handleChange}/>

                <TextField
                    multiline
                    rows={2}
                    rowsMax={4}
                    id="Aditional"
                    label="Additional Comment"
                    value={selectedItem?.Description}
                    style={{ margin: 8 }}
                    placeholder="Insert Text"
                    helperText="EG. I would like more mashrums"
                    fullWidth
                    onChange={handleChange}
                    margin="normal"
                    InputLabelProps={{
                    shrink: true,
                            }}
                            variant="outlined"
                />

       
                <TextField
                    id="Address"
                    label="Adress to be delivered"
                    value={selectedItem?.Address}
                    style={{ marginTop:'20px'}}
                    fullWidth
                    placeholder="Insert Text"
                    helperText="Trg play 1/29 Boston #444"
                    onChange={handleChange}
                    margin="normal"
                    InputLabelProps={{
                    shrink: true,
                            }}
                            variant="outlined"
                />

                <p style={{fontSize:'20px', textAlign:'left'}}><span>Materials: </span><span> {selectedItem?.Material}  <span style={{color:'blue'}}>{selectedItem?.Aditional}</span></span></p>

                        <Button  onClick={addToCart} style={{background:'green', color:'white', width:'100%', fontSize:'20px', marginTop:'80px'}}><ShoppingCartIcon/> <span style={{margin:'0 20px'}}>Add to Cart</span>|<span style={{marginLeft:'10px'}}>{selectedItem?.Price ? `${selectedItem.Price * (selectedItem?.Quantity || 1 )} $` : ""}</span></Button>
               
                {
                    succMessage ? <div style={{marginTop:'15px', borderBottom:'2px solid green'}}><span>Item added to Cart</span></div> : false
                    
                }
                {
                    error ? <div style={{marginTop:'15px', borderBottom:'2px solid red'}}><span>{error}</span></div> : false
                    
                }
                <br/>
                <br/>
                </form>
            </div>
            <div className="gallery">
                <h2 style={{width:'90%' ,margin:'20px auto', fontSize: '4vmin'}}>
                    Choose your winning combination
                </h2>
                <div style={{marginTop:'80px', textAlign:'center'}}>
                {
                    items?.map(item=><Pizza item={item}  Name={item.Name} addToCheckOut={(item)=>{props.setCartFn(item)}}  setPizza={(item)=>{setItem(item)}} image={item?.PhotoPath ? `https://localhost:44309/Images/${item?.PhotoPath}` : "https://via.placeholder.com/640x360"}/>)
                } 
                </div>
  
            </div>
          
    </div>)
}

export default OrderForm