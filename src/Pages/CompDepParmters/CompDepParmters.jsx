import React , {Component} from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import CompDepParmters from "../../Components/CompDepParmters/CompDepParmters";
import {getData} from "../../Data/Data";
import NavNew from "../../Components/Drawer/NavNew";

const route = [{routeName: 'Applications' , routePath:'/'} ,
    {routeName: 'Projects' , routePath:'/ProjectsPage'},
    { routeName: 'Modules' , routePath:'/module'},
    { routeName: 'Screen' , routePath:'/screens'}];

//const aya =window.$lolo;
//window.global+=({routeName: '111' , routePath:'/111'})
//window.global.push({routeName: '111' , routePath:'/111'})


class CompDepParmterss extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url:getData,
            data:[],
            // MOD_ID : this.props.location.state.id ,
            P_DEP_ID: sessionStorage.getItem("P_DEP_ID"),
            columns: [
                { title: 'PARAM_NAME', field: 'PARAM_NAME' },
                { title: 'PARAM_TYPE', field: 'PARAM_TYPE' },
            ],
            title:'PARAMETERS'

        }
    }

    componentDidMount(){
        axios({
            method: 'post',
            url:this.state.url,
            data:{
                fun_name:"FU_DOC_COMP_DEP_PARAMETERS",
                param_name:["P_DEP_ID"],
                param_value:[this.state.P_DEP_ID]
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
                        <NavNew routes = {route}/>
                        <br/>
                        <br/>

                    </div>
                </div>
                <div className = "row">
                    <div className="col-12">
                        <CompDepParmters data = {this.state.data} columns = {this.state.columns} title = {this.state.title} P_DEP_ID = {this.state.P_DEP_ID}/>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(CompDepParmterss);