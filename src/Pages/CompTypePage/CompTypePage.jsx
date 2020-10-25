import React , {Component} from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import CompType from "../../Components/CompType/CompType";
import BreadCrumbComp from "../../Components/BreadCrumbComp/BreadCrumbComp";
import {getData} from "../../Data/Data";
import NavNew from "../../Components/Drawer/NavNew";
const route = [{routeName: 'Comp Type' , routePath:'/CompType'}];


class CompTypePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url:getData,
            data:[],

            columns: [
                { title: 'COMP_TYPE_NAME', field: 'COMP_TYPE_NAME' },
            ],
            title:'COMP_TYPE_NAME '

        }
    }

    componentDidMount(){
        axios({
            method: 'post',
            url:this.state.url,
            data:{
                fun_name:"FU_DOC_COMPONENT_TYPES",
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
                        <NavNew  routes = {route} />
                        {/*<MenuAppBar title='DEP TYPE'/>*/}
                        <br/>
                        <br/>
                    </div>
                </div>
                <div className = "row">
                    <div className="col-12">
                        <CompType data = {this.state.data} columns = {this.state.columns} title = {this.state.title} />
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter( CompTypePage);