import React, { useEffect, useState } from "react"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
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

function SignInComponent(props) {
  const isDesktopOrLaptop = useMediaQuery({ maxDeviceWidth: 1224 })

  const changeFirstToUpper=(object)=>{
        let ob={}
        Object.entries(object).map(([prop,value])=>{
         ob[prop.substring(0, 1).toUpperCase() + prop.substring(1)]=value;
        })
       return ob;
      }


  const classes = useStyles();

  useEffect(()=>{
    const localData=JSON.parse(localStorage.getItem("loginData"))
    if(localData)
    {
        const goodData=changeFirstToUpper(localData.data)

        setData(goodData)

    }
  },[])

  const [show, setVisibility] = React.useState()

  const [data, setData] = useState({
                                        Email: props.loginData?.Email ||  "",
                                        Password: props.loginData?.Password || "",
                                        RememberMe: props.loginData?.RememberMe || false
                                     })


  const handleChange = (e) => {
   e.currentTarget.checked ? setData({ ...data, [e.currentTarget.id]: e.currentTarget.checked }) : setData({ ...data, [e.currentTarget.id]: e.currentTarget.value })  
  }

  const handleSubmit = (e) => {

    fetch(`https://localhost:44309/account/login`,{
    method:'POST',
    headers:{
                "Content-Type":'application/json'
            },
    mode:'cors',
    body:JSON.stringify(data)
    }).then(x=>x.json()).then(y=>
        {
          console.log(y)
          localStorage.setItem("Email", y.data.email)
          if(!y.message)
          {
            if(data.RememberMe)
            localStorage.setItem("loginData", JSON.stringify(data)) 
            else
            localStorage.removeItem("loginData")


            props.setSignIn(y);
            props.history.push("/home")
          }
          
        }).catch(e=>console.log(e))

     
  }  


  const handleClickShowPassword = () => {
    setVisibility(!show);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div  style={{display:'flex',flexWrap:'wrap', width:'100%'}}>
    <CssBaseline />
    {
      isDesktopOrLaptop ?   <div className={classes.logoSectionMobile}>   
                              <img src="/Header.png" alt="logo" style={{margin:'0 auto', width:'50%'}}/>
                            </div>
                              :      
                            <div className={classes.logoSectionDesktop}>   
                              <img src="/Header.png" alt="logo" style={{margin:'0 auto', width:'50%'}}/>
                            </div>
                           
    }
  

    <div className={isDesktopOrLaptop ?  classes.paperMobile : classes.paperDesktop } >
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" >
        Sign in
      </Typography>

      <p style={{margin:'10px 0 0 0'}}>ili</p>
      <form className={classes.form} noValidate>    
      
              <TextField
              variant="outlined"
              margin="normal"
              required
              color="primary"
              fullWidth
              id="Email"
              value={data?.Email}
              label="Email"
              name="Email"
              onChange={handleChange}
              placeholder="Email"/>


        <FormControl className={clsx(classes.margin, classes.textField)} style={{width:'100%'}}>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <OutlinedInput
           placeholder="Enter your password"
            id="Password"
            type={show ? 'text' : 'password'}
            value={data?.Password}
            style={{width:'100%'}}
            label="Password"
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {show ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
    </FormControl>

{/*          
         <TextField
              variant="outlined"
              margin="normal"
              required
              type="password"
              color="primary"
              value={}
              id="Password"
              name="Password"
              onChange={handleChange}
             /> */}

            <FormControlLabel  style={{color:'blue'}} 
                control={<Checkbox  id="RememberMe" checked={data.RememberMe} onChange={handleChange}/>}
                label="Remember me"
            ></FormControlLabel>
        <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            style={{display:'block'}}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forgotPassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
    </div>
  </div>
  )
}

export default SignInComponent
