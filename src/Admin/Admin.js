import React, { useState,useEffect } from 'react'
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
import Autocomplete from '@material-ui/lab/Autocomplete';
import PublishIcon from '@material-ui/icons/Publish';
import AlarmIcon from '@material-ui/icons/Alarm';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ListOfItemDialog from './ListOfItemDialog';
import './Admin.css'
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  
  
const Admin=(props)=>{

    const [items, setItems]=useState();


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
                 ob[prop.substring(0, 1).toUpperCase() + prop.substring(1)]=value;
                })
                console.log(ob);
                return ob;

              })  

        setItems(items);
 
        })
    }

    useEffect(()=>{getItems()},[])

    const classes=useStyles()
    const[showImage, setImageUploaded]=useState()
    const [dialog, setDialog]=useState();
    const [item, setItem] = React.useState({
        Name: '',
        Material: '',
        Size:'',
        Price:'',
        Photo:''
      });

    const [error, setError]=React.useState();

    const editItem=(editItem)=>{ 
        console.log(editItem)
        const ob={};
        for (const prop in editItem) {
                if(prop=="Size" || prop=="Material" )
                    ob[prop]=editItem[prop].split(",")
                
                else if(prop=="PhotoPath" && editItem[prop])
                setImageUploaded(`https://localhost:44309/Images/${editItem[prop]}` )
                
                else
                ob[prop]=editItem[prop]

        }
        setItem(ob)
        setDialog(!dialog)
    }

    
  


      const handleImage=(e)=>{
        const photoExtension=e.target.value.split("\\").pop().split(".").pop();
        console.log(photoExtension)
        if (["jpeg", "jpg", "png", "svg"].includes(photoExtension))
            {
                setItem({...item, "Photo":e.target.files[0]})
                setImageUploaded(URL.createObjectURL(e.target.files[0]))
                e.target.value=null;

            }
      }

      const handleChange = (event, value) => {
        let id=event.target.id;
        let valueCopy=event.target.value
        if(value)
        {
            id=id.split("-").shift();
            valueCopy=value
        }
                 
        setItem({
              ...item,
              [id]:valueCopy
            });
        
      
      };

      const [succMessage, setSuccesMess]=useState();
      const [isOrder, setIsOrder]=useState(false);

      const handleSubmit = () => {
        const formData = new FormData()
        for (const prop in item ) {
            if(item[prop]!="")
            {
                if(prop!="")
                {
                    if(Array.isArray(item[prop]))
                    formData.append(prop, item[prop].join())
                    else
                    formData.append(prop, item[prop])
                }        
            }
            else
            {
                setError(prop)
                document.getElementById(prop).focus();
                setTimeout(()=>{
                    setError(null);
                },2000)
                return;
            }
        }

        const method = item?.Id > 0 ? "PUT" :"POST" 
        fetch(`https://localhost:44309/food`, {
            method: method,
            body: formData,
            mode:'cors'
          })
          .then(res => res.json())
          .then(x => {
            setImageUploaded(null)
            getItems();
            setItem({Name: '',Material: '', Size:'',Price:'',Photo:''})
            setSuccesMess(true)
            setInterval(()=>{
                setSuccesMess(false);
                clearInterval(this)
            },1300)
          })

            
      };


      //this should be done in db ... but ..
      const sizes=["small", "medium", "large", "jumbo"]
      const materials=["sos", "Cheeze", "mushrooms", "Mayonez", "Ketchup", "Vegetables"]

      console.log(item)

    return(<div>

            <div className="orderForm">
                <h2 style={{width:'90%', marginTop:'130px' }}>
                    Add new items
                </h2>
                <form style={{width:'50%', textAlign:'center', margin:'0 auto'}}>
                <TextField id="Name" label="Insert Item" variant="outlined" fullWidth value={item?.Name} style={{marginTop:'70px'}} onChange={handleChange}/>

                <FormControl variant="filled" className={classes.formControl} style={{marginRight:'30px', marginTop:'20px'}}>

                    <Autocomplete
                            multiple
                            id="Size"
                            options={sizes}
                            onChange={handleChange}
                            getOptionLabel={(option) => option}
                            value={[...item?.Size || []]}
                            filterSelectedOptions
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Size"
                                placeholder="Size"
                            />
                            )}
                        />
                       
                </FormControl>
                <FormControl variant="filled" className={classes.formControl} style={{marginRight:'30px', marginTop:'20px'}}>

                    <Autocomplete
                            multiple
                            id="Material"
                            onChange={handleChange}
                            options={materials}
                            getOptionLabel={(option) => option}
                            value={[...item?.Material]}
                            filterSelectedOptions
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Materials"
                                placeholder="Material"
                            />
                            )}
                        />
                    
                    </FormControl>
                    <FormControl variant="filled" className={classes.formControl} style={{marginRight:'30px', marginTop:'20px'}}>
                        <TextField value={item?.Price} id="Price" label="Price" variant="outlined"  onChange={handleChange}/>
                    </FormControl>

            <div style={{display:'flex', flexWrap:'wrap'}}>
                <div class="hover" style={{position:'relative', width:'250px' ,color:'white', marginTop:'30px',flex:'30%'}} >
               <label htmlFor="Photo" class="hover" style={{display:'inline-block',position:'relative',textAlign:'center', border:'2px solid transparent',boxShadow:'2px 2px 1px 2px', background:'rgba(55, 180, 211, 0.6)',padding:'10px',fontSize:'2vmin', width:'230px', borderRadius:'10px'}}>
                   Upload
                   <PublishIcon style={{position:'absolute', top:'20%', left:'80%'}}/>
                </label>
               </div>     
               <div class="hover" style={{position:'relative', width:'250px',flex:'30%', color:'white', marginTop:'30px'}} >
               <label onClick={()=>{setDialog(true); setIsOrder(false)}} class="hover" style={{display:'inline-block', position:'relative',textAlign:'center', border:'2px solid transparent',boxShadow:'2px 2px 1px 2px', background:'purple',padding:'10px',fontSize:'2vmin', width:'230px', borderRadius:'10px'}}>
                   List of Items
                   <AlarmIcon style={{position:'absolute', top:'20%', left:'80%'}}/>
                </label>
               </div>   
               <div class="hover" style={{position:'relative', width:'250px',flex:'30%', color:'white', marginTop:'30px'}} >
               <label onClick={()=>{setDialog(true); setIsOrder(true)}} class="hover" style={{display:'inline-block', position:'relative',textAlign:'center', border:'2px solid transparent',boxShadow:'2px 2px 1px 2px', background:'brown',padding:'10px',fontSize:'2vmin', width:'230px', borderRadius:'10px'}}>
                   All Orders
                   <ListAltIcon  style={{position:'absolute', top:'20%', left:'80%'}}/>
                </label>
               </div>                   
            </div>
              
               <div style={{display:'flex'}}>
               {
                   showImage? <img src={showImage} style={{maxWidth:'300px'}}/>:false
               }
                   
                </div>        
               <input type="file" id="Photo" style={{display:'none'}} onChange={handleImage}></input>

                <Button onClick={handleSubmit} style={{background:'green', color:'white', width:'100%', fontSize:'20px', marginTop:'80px'}}>Save </Button>
               
                {
                    succMessage ? <div style={{marginTop:'15px', borderBottom:'2px solid green'}}><span>Uspješno ste dodali u vašu bazu</span></div> : false
                    
                }
                 {
                    error ? <div style={{marginTop:'15px', borderBottom:'2px solid red'}}><span>All fields are required: <span style={{color:'red'}}>{error}</span> </span></div> : false
                    
                }
                </form>


                <ListOfItemDialog items={items} 
                                  getItems={getItems}
                                  admin={true} 
                                  editItem={editItem} 
                                  openOrders={isOrder} 
                                  close={()=>{setDialog(!dialog)}} 
                                  navigate={()=>props.history.push("/home")} 
                                  open={dialog}/>
            </div>     
    </div>)
}

export default Admin