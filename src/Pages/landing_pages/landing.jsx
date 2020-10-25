import React , {Component} from 'react';
import axios from 'axios';
import '../landing_pages/landing.css';
import AddModal from '../../Components/AddModal/AddModel';
import MediaCard from '../../Components/CardDocument/CardDocument';
import Grid from '@material-ui/core/Grid';
import { withRouter } from "react-router-dom";
import { Button } from '@material-ui/core';
import pagefor from '../../Components/pagefor/pagefor';
import MenuAppBar from '../../Components/AppBar/AppBar'
import {CrudData, getData} from "../../Data/Data";


class Landing extends Component {
    constructor(props) {
      console.log(props);
        super(props);
        this.state = {
          crudURL :CrudData,
            data:[], url: getData , columns: [
              { title: 'Name', field: 'APP_NAME' },
              { title: 'id', field: 'APP_ID', type: 'numeric' },
              { title: 'DESC', field: 'APP_DESC' },
          ],
          title:'Table',
          status : "" ,
          update:""

        }
        
}
 handleEdit = (app) => {
   axios({
    method: 'POST',
    url:this.state.crudURL,
    data:{
        fun_name:"PRO_UPDATE_DOC_APPLICATIONS",
        param_name:['P_APP_ID ,P_APP_NAME','P_APP_DESC'],
        param_value:[app.APP_ID , app.APP_NAME , app.APP_DESC],
    }
  })
  .then(response => {
         console.log(response.data)    
    this.setState({updtae: response.data })
    
    })
  .catch(error => console.error('timeout exceeded'))    
}

handledelete = (id) => {
        console.log(id);
  axios({
    method: 'POST',
    url:this.state.crudURL,
    data:{
        fun_name:"PRO_DELETE_DOC_APPLICATIONS",
        param_name:["P_APP_ID"],
        param_value:[id],
    }
  })
  .then(response => {
         console.log(response.data)    
     this.setState({status :response.data})
     this.props.history.push('/');
    })
  .catch(error => console.error('timeout exceeded'))

}

/*componentDidUpdate()
{

    window.onpopstate = (e) => {
        console.log("aaaaa")
        window.history.forward()
        
    }

}*/

componentDidMount(){
  axios({
          method: 'POST',
          url:this.state.url,
          data:{
              fun_name:"FU_DOC_APPLICATIONS",
              param_name:[],
              param_value:[],
          }
        })
        .then(response => {
               console.log(response.data.Table)    
           this.setState({data :response.data.Table })
          })
        .catch(error => console.error('timeout exceeded'))
  
  
      }
handleClick =(id) =>{
  const all_data = this.state.data;
 const single_data = all_data.find(d => d.APP_DESC === id);
 const par = document.getElementById("1");
 const par_container = document.getElementsByClassName("zeinab");
 par_container[0].style.display ="block"
 par.textContent = single_data.APP_DESC
 
 
}
handelonclick = (d) =>{
  let state =  {id:d }
  this.props.history.push('/pagefor', state);
    sessionStorage.setItem("App_ID",state.id);
}



render () {
    return (

      
        <div className="grid">
         <AddModal/>

        
         

    <Grid container spacing={3}>

    {this.state.data.map((d) => {
   return (
       <Grid item xs={4}>
       <div key={d.APP_ID}>
            <MediaCard appName = {d.APP_NAME} appDesc= {d.APP_DESC} appID = {d.APP_ID}  handledelete = { () => {this.handledelete(d.APP_ID)} }
                  handleedit = { ()=> {this.handleEdit(d)}}   handelonclick = { ()=> {this.handelonclick(d.APP_ID)}}/>
            </div>

            
       </Grid>
      
    )
 })
 }
    </Grid>

<div className="zeinab">
  <p id="1">
    
  </p>

</div>
  </div>
    )
}

}

export default  withRouter(Landing) ;