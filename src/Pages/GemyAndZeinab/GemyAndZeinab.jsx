import React , {Component} from 'react';
import ComboZeze from '../../Components/DropDown/DropDown';
import BreadCrumbComp from "../../Components/BreadCrumbComp/BreadCrumbComp";
import {data} from "../../Data/Data";
import axios from "axios";
import NavNew from "../../Components/Drawer/NavNew";

const route = [{routeName: 'CRUD TYPES' , routePath:'/CRUDTYPES'} ];


class GemyAndZeinab extends Component {
    constructor(props) {
        super(props);
        (async () => {
            const raw = await fetch('http://172.16.1.102:6060/api/v1/getdata', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({fun_name:"FU_DOC_DEPENDANCY_TYPES", param_name: [] , param_value:[]})
            });
            const DOC_DEPENDANCY_TYPES = await raw.json();
            this.setState({DOC_Types : DOC_DEPENDANCY_TYPES})

        })();

        this.state = {
           DOC_Types : []
        }
    }
    componentDidMount(){
        axios({
            method: 'post',
            url:'http://172.16.1.102:6060/api/v1/getdata',
            data:{
                fun_name:"FU_DOC_DEPENDANCY_TYPES",
                param_name:[],
                param_value:[]
            }
        })
            .then(response => {
                console.log(response.data.Table)
               this.setState({DOC_Types:response.data.Table})
            })
            .catch(error => console.error('timeout exceeded'))
      
    }

    render() {
        return (
            <div>
                <div className = "row">
                    <div className="col-12">
                        <NavNew routes = {route}/>
                        {/*<MenuAppBar title='CRUD TYPES'/>*/}
                        <br/>
                        <br/>
                    </div>
                </div>
                <div className = "row">
                    <div className="col-12">
                        <ComboZeze data = {this.state.DOC_Types} label="Doc_Types"/>

                    </div>
                </div>
            </div>
        );
    }


}
export default GemyAndZeinab;