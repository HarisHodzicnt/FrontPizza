import React, { useEffect, useState } from "react"
// import axios from "axios"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { useMediaQuery } from 'react-responsive'




const useStyles = makeStyles((theme) =>
createStyles({  
  paperDesktop: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex:'auto',
    marginRight:theme.spacing(35)
  },
  paperMobile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex:'auto',
    margile:'0 auto'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '70%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
},
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logoSectionDesktop:{
    flex:'40%', 
    marginTop: theme.spacing(10)
  },
  logoSectionMobile:{
    flex:'40%', 
    marginTop: theme.spacing(15)
  },
  formSectionDesktop:{
    flex:'40%',
    textAlign:'center'
  },
  formSectionMobile:{
    flex:'40%',
    textAlign:'center'
  }
}),
);

function SignUpComponent(props) {
  const isDesktopOrLaptop = useMediaQuery({ maxDeviceWidth: 1224 })

  const classes = useStyles();

  const [data, setData] = useState({
    Email: "",
    Password: "",
    ConfirmPassword: "",
    City: "",
    Name:"",
    PhoneNumber:""
})

  const handleChange = (e) => {
    setData({ ...data, [e.currentTarget.id]: e.currentTarget.value })
  }


  const handleSubmit =async () => {
    console.log(data)

    fetch(`https://localhost:44309/account/register`,{
        method:'POST',
        headers:{
                    "Content-Type":'application/json'
                },
        mode:'cors',
        body:JSON.stringify(data)
        }).then(x=>x.json()).then(y=>
            {
                props.setSignIn(y);
                props.history.push("/home")
            })
      
  }  

 
  const labels = {
    Email: "Email",
    Password: "Password",
    ConfirmPassword: "Confirm password",
    Name:'Name',
    PhoneNumber:'Phone Num.',
    City: "City"
  }
  return (
<div  style={{minHeight:'90vh', display:'flex', flexWrap:'wrap', width:'100%'}}>
    <CssBaseline />
    {
      isDesktopOrLaptop ? <div className={classes.logoSectionMobile}>   
                            <img src="/Header.png" alt="logo" style={{margin:'0 auto', width:'50%'}}/>
                        </div> :
                        <div className={classes.logoSectionDesktop}>   
                        <img src="/Header.png" alt="logo" style={{margin:'0 auto', width:'50%'}}/>
                    </div>
    }
   

    <div className={isDesktopOrLaptop ?  classes.paperMobile: classes.paperDesktop} >
   
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" >
        Sign up
      </Typography>
      <p style={{margin:'10px 0 0 0'}}>ili</p>
      <form className={classes.form} noValidate>
        
      {Object.getOwnPropertyNames(data).map((property)=> {
       return (
          <div style={{textAlign:'left'}}>
            {
            property === "UserRoleApp" ? (
               <TextField
               style={{marginTop:'2px'}}
               id={property}                               
               select
               label={data[property]}
               value={data[property]}
               onChange={handleChange}
               SelectProps={{
                 native: true,
               }}
               helperText="Please select your currency"
               variant="outlined"
             >
                 <option>Aktivnost</option>
                 <option value="0">Employeer</option>
                 <option value="1">Employee</option>
              </TextField>
            ) : (
              <TextField
              variant="outlined"
              margin="normal"
              required
              color="primary"
              fullWidth
              id={property}
              label= {labels[property]}
              name="nesto"
              onChange={handleChange}
              placeholder="nesto"
         
            />
            )}
          </div>
        )
      })}

        <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container>
           
            <Grid item xs={12} md={12} lg>
              <Link href="/login" variant="body2">
                {"You have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
          <br/>
        </form>
    </div>
  </div>

  )
}

export default SignUpComponent
