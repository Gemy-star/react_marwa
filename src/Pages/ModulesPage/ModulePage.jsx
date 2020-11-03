import React , {Component} from 'react';
import axios from 'axios';
import CRUDGrid from '../../Components/CRUDGrid/CRUDGrid';
import { withRouter } from "react-router-dom";
import MenuAppBar from '../../Components/AppBar/AppBar';
import BreadCrumbComp from "../../Components/BreadCrumbComp/BreadCrumbComp";
import PathComponent from "../../Components/PathComponent/PathComponent";
import {getData} from "../../Data/Data";
import NavNew from "../../Components/Drawer/NavNew";



const route = [{routeName: 'Applications' , routePath:'/'} , {routeName: 'Projects' , routePath:'/ProjectsPage'},{ routeName: 'Modules' , routePath:'/module'}];
//WINDOW.GLOBAL DEFINES A GLOBAL VARIAVLEE BS MSH 3RFEN N DIT FEHHH MN AY SCREEN TANYA
//window.global.push({routeName: '222' , routePath:'/22'})

class ModulePage extends Component {
    constructor(props) {
        super(props);
         this.state = {
             url:getData,
             data:[],
            // proj_ID : this.props.location.state.id ,
             proj_ID :  sessionStorage.getItem("PROJ_ID"),
             columns: [
                 { title: 'Name', field: 'MOD_NAME' },
                 { title: 'Description', field: 'MODULE_DESC' },
             ],
             title:'Module'
         }
    }

    componentDidMount(){
        axios({
            method: 'post',
            url:this.state.url,
            data:{
                fun_name:"FU_DOC_MODULES",
                param_name:["P_PROJ_ID"],
                param_value:[this.state.proj_ID]
            }
        })
            .then(response => {
             this.setState({data: response.data.Table})
              console.log(response.data.Table)
    
            })
            .catch(error => console.error('timeout exceeded'))
    }
    render() {
        return (
            <div>
                <div className = "row">
                    <div className="col-12">
                        <NavNew  routes = {route}/>
                {/*<MenuAppBar title='Modules'/>*/}
                <br/>
                <br/>
                {/*<h1>{path}</h1>*/}
                {/*<PathComponent Path={path}/>*/}
                        <br/>
                        <br/>
                        <br/>
                        <hr/>
                    </div>
                    </div>
                    <div className = "row">
                    <div className="col-12">
                        <CRUDGrid data = {this.state.data} columns = {this.state.columns} title = {this.state.title} proj_id = {this.state.proj_ID}/>
                    </div>
                    </div>
            </div>
        );
    }

}

export default withRouter( ModulePage);