import React , {useState} from 'react';
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
        filter: 'blur(0.50rem)',
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


function SignInPass (props) {

    const container = {
        url:"http://172.16.1.102:7070/learnapi/v1/authenticate" ,
        redirect:'/'
    }
    const [password , setPassword] = useState("");
    const classes = useStyles();

    function handleChange (event) {
        setPassword(event.target.value)
    }
 function handleSent  (event)  {
        event.preventDefault();

        axios({
            method: 'post',
            url:container.url,
            data:{
                fun_name:"FU_SEC_USER4",
                param_name:["P_USER_NAME", "P_USER_PASSWORD"],
                param_value:[props.username, password]
            }
        })
            .then(response => {
                sessionStorage.setItem("TOKEN_ID", response.data.Table[0].TOKEN_ID);
                sessionStorage.setItem("USER_ID", response.data.Table[0].USER_ID);
                props.history.push(container.redirect);


            })
            .catch(error => console.error('timeout exceeded'))

    }

        return (
            <div className="sign-in">
            <div className='form'>
                <Grid container sm={12} md={12} component="main" className={classes.root}>
                <CssBaseline />
                <Grid  item xs={false} sm={8} md={12} className={classes.image} />
                <Grid className='forminside' item xs={12} sm={8} md={3} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                        Welcome {props.fullName}
                        </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="password"
                                name="password"
                                type="password"
                                autoComplete="password"
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
            </div>
        );


}

export default withRouter(SignInPass)