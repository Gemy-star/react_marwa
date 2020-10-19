import React ,{ useState } from 'react';
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
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { withRouter } from "react-router";


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
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
        backgroundColor: 'white',
        color: 'black',

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor:'white',
    color: 'blue',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    color: 'black',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

 function AddForm(props) {
    // console.log(props.currentPage)
  const classes = useStyles();
  const [app_name, setAppName] = useState("");
  const [app_desc, setAppDesc] = useState("");
  const [url, setUrl] = useState("http://172.16.1.102:6060/api/v1/crud");
  const [data, setData] = useState("");
  const [PROJ_ID, setPROJ_ID] = useState( sessionStorage.getItem("APP_ID") );

  const [currentPage, currentPage1] =useState( props.currentPage);
const handClose = (event) => {
  event.preventDefault();
  //props.history.push('/')
}

  const  handlesubmit = (event) => {
     // event.preventDefault();
      debugger
      if (currentPage === "apps") {
          axios({
              method: 'POST',
              url:url,
              data:{
                  fun_name:"PRO_INSERT_DOC_APPLICATIONS",
                  param_name:['P_APP_NAME','P_APP_DESC'],
                  param_value:[app_name , app_desc],
              }
          })
              .then(response => {

              })
              .catch(error => console.error('timeout exceeded'))  ;
      }
      else {
          axios({
              method: 'POST',
              url:url,
              data:{
                  fun_name:"PRO_INSERT_DOC_PROJECTS",
                  param_name:['P_PROJ_NAME','P_APP_ID','P_PROJ_DESC'],
                  param_value:[app_name, PROJ_ID , app_desc],
              }
          })
              .then(response => {
                  console.log(response.data)
                  //setData(response.data )
                  //props.history.push('/')
                  // window.location.reload()
              })
              .catch(error => console.error('timeout exceeded'))  ;
      }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {props.title}
        </Typography>
        <form className={classes.form} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                value={app_name}
          onChange={e => setAppName(e.target.value)}
                required
                fullWidth
                id="app_name"
                label="Application Name"
                name="app_name"
                type="text"
                autoFocus           
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
               value={app_desc}
               onChange={e => setAppDesc(e.target.value)}
                variant="outlined"
                required
                fullWidth
                name="app_desc"
                label="Description"
                type="text"
                id="app_desc"
                required
                fullWidth
                />
            </Grid>
          </Grid>
          <Button
          onClick = {(event) =>{handlesubmit(event)}}
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
           Add
          </Button>
          <Button
          onClick = {(event) => {handClose(event)}}
            type="submit" 
            variant="contained"
            color="danger"
            className={classes.submit}
          >
           Close
          </Button>
        </form>
      </div>
    
    </Container>
  );
}
export default withRouter(AddForm);