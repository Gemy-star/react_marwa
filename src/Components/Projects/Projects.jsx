import React , {Component} from 'react';
import axios from 'axios';
import '../../Pages/landing_pages/landing.css'
import AddModal from '../../Components/AddModal/AddModel';
import MediaCard from '../../Components/CardDocument/CardDocument';
import Grid from '@material-ui/core/Grid';
import { withRouter } from "react-router-dom";
import MenuAppBar from '../../Components/AppBar/AppBar'
//import { useHistory } from "react-router-dom";


class Project extends Component {

    constructor(props) {
        super(props);

        this.state = {
          crudURL :"http://172.16.1.102:6060/api/v1/crud",
            data:[], url: 'http://172.16.1.102:6060/api/v1/getdata' ,
            PROJ_ID : sessionStorage.getItem("APP_ID") ,
          status : "",

        }

}

handledelete = (id) => {
        console.log(id)
  axios({
    method: 'POST',
    url:this.state.crudURL,
    data:{
        fun_name:"PRO_DELETE_DOC_PROJECTS",
        param_name:['P_PROJ_ID'],
        param_value:[id],
    }
  })
  .then(response => {
     this.setState({status :response.data})
      console.log(this.state.status)
     this.props.history.push('/Projects');
    // window.location.reload();
    })
  .catch(error => console.error('timeout exceeded'))

}


componentDidMount(){

    axios({
        method: 'POST',
        url:this.state.url,
        data:{
            fun_name:"FU_DOC_PROJECTS",
            param_name:["P_APP_ID"],
            param_value:[this.state.PROJ_ID],
        }
      })
      .then(response => {
            // console.log(response.data.Table)
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
handelonclick = (id,name) =>{

  let state =  {id:id , name:name}
  this.props.history.push('/module', state);
  sessionStorage.setItem("PROJ_ID",state.id);
  sessionStorage.setItem("PROJ_NAME",state.name);
//alert(sessionStorage.getItem("PROJNAME"));
}

render () {
    const data = this.state.data

    return (

      
        <div>


         <AddModal handleSubmit={() => {this.handlesubmit()}}/>
         

    <Grid container spacing={3}>

    {this.state.data.map((d) =>{

   return (
       <Grid item xs={4}>
       <div key={d.PROJ_ID}>
            <MediaCard appName = {d.PROJ_NAME} appDesc= {d.PROJ_DESC} appID = {d.PROJ_ID}   handledelete = { () => {this.handledelete(d.PROJ_ID)} }
                       handelonclick = { ()=> {this.handelonclick(d.PROJ_ID,d.PROJ_NAME)}}    />
            </div>
            
       </Grid>
      
    )
 })
 }
    </Grid>

  </div>
    )
}

}

export default  withRouter(Project) ;