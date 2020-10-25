import React , {Component} from 'react';
import axios from 'axios';
import '../../Pages/landing_pages/landing.css'
import AddModal from '../../Components/AddModal/AddModel';
import MediaCard from '../../Components/CardDocument/CardDocument';
import Grid from '@material-ui/core/Grid';
import { withRouter } from "react-router-dom";
import MenuAppBar from '../../Components/AppBar/AppBar'
import {CrudData, getData} from "../../Data/Data";


class Pagefor extends Component {


    constructor(props) {
        super(props);
        this.state = {
          crudURL :CrudData,
            data:[], url: getData ,
          status : ""

        }
       // console.log(this.props.proj_id)
}
 

handledelete = (id) => {
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
     this.setState({status :response.data})
     this.props.history.push('/pagefor');
    })
  .catch(error => console.error('timeout exceeded'))

}


componentDidMount(){
    //console.log(this.props.location.state.id)
 
    axios({
        method: 'POST',
        url:this.state.url,
        data:{
            fun_name:"FU_DOC_PROJECTS",
            param_name:["P_APP_ID"],
            param_value:[this.props.proj_id],
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
  this.props.history.push('/module', state);
}


render () {
    const data = this.state.data
    return (

      
        <div>


         <AddModal/>
         

    <Grid container spacing={3}>

    {data?data.map((d) => {
   return (
       <Grid item xs={4}>
       <div key={d.APP_ID}>
            <MediaCard appName = {d.PROJ_NAME} appDesc= {d.PROJ_DESC} appID = {d.PROJ_ID}   handledelete = { () => {this.handledelete(d.PROJ_ID)} }
                  handleedit = { ()=> {this.handleEdit(d)}}  handelonclick = { ()=> {this.handelonclick(d.PROJ_ID)}}         />
            </div>
            
       </Grid>
      
    )
 }) : <div></div>
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

export default  withRouter(Pagefor) ;