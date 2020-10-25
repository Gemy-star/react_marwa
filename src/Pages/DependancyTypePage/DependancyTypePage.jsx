import React , {Component} from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import MenuAppBar from '../../Components/AppBar/AppBar';
import DependancyTypeGRID from "../../Components/DependancyTypeGRID/DependancyTypeGRID";
import BreadCrumbComp from "../../Components/BreadCrumbComp/BreadCrumbComp";
import {getData} from "../../Data/Data";
import NavNew from "../../Components/Drawer/NavNew";

const route = [{routeName: 'Dependancy Type' , routePath:'/DependancyTypePage'}];


class DependancyTypePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url:getData,
            data:[],

            columns: [
                { title: 'DEP_TYPE_NAME', field: 'DEP_TYPE_NAME' },
            ],
            title:'DEP TYPE '

        }
    }

    componentDidMount(){
        axios({
            method: 'post',
            url:this.state.url,
            data:{
                fun_name:"FU_DOC_DEPENDANCY_TYPES",
                param_name:[],
                param_value:[]
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
                        {/*<MenuAppBar title='DEP TYPE'/>*/}
                        <br/>
                        <br/>
                    </div>
                </div>
                <div className = "row">
                    <div className="col-12">
                        <DependancyTypeGRID data = {this.state.data} columns = {this.state.columns} title = {this.state.title} />
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter( DependancyTypePage);