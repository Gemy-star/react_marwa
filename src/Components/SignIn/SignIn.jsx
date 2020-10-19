import React , {Component , useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import img from './img/ze.PNG';
import  './signin.css'



function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',

    },
    image: {
        backgroundImage:  `url(${img})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(0.10rem)',
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
   avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

 function SignInSide(props) {
     const container = {
         url:"http://172.16.1.102:7070/learnapi/v1/authenticate" ,
         redirect:'/loginpass',
         backgroundColor:'whit'

     };

const [name , setName] = useState("");
     function handleChange (event) {
         setName(event.target.value)
     }
     function handleSent (event)  {
         event.preventDefault();

         axios({
             method: 'post',
             url:container.url,
             timeout: 4000,    // 4 seconds timeout
             data:{
                 fun_name:"FU_SEC_USER3",
                 param_name:["P_USER_NAME"],
                 param_value:[name]
             }
         })
             .then(response => {
                 if (response.data.Table[0].SEC_STATUS === "doneuser"){
                     console.log(response.data)
                     let state =  {username : name , full_name:response.data.Table[0].USER_DESC }
                     console.log(`${container.redirect}`)
                     props.history.push(container.redirect, state);

                 }else {
                     alert('zeze')
                 }

             })
             .catch(error => console.error('timeout exceeded'))

     }



     const classes = useStyles();

    return (
        <div className="sign-in">
        
            <Grid container sm={12} md={12} component="main" className={classes.root}>
            <CssBaseline />
            <Grid  item xs={false} sm={8} md={12} className={classes.image} />
            <Grid className='forminside' item xs={12} sm={8} md={3} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="Username"
                            autoComplete="Username"
                            autoFocus
                            onChange = {handleChange}
                        />


                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSent}
                        >
                            Sign In
                        </Button>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
        
        </div>
    );
}


export default withRouter(SignInSide);


