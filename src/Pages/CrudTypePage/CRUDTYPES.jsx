import React , {Component} from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import MenuAppBar from '../../Components/AppBar/AppBar';
import CRUDTYPESGrid from "../../Components/CRUDTYPES/CRUDTYPESGrid";
import BreadCrumbComp from "../../Components/BreadCrumbComp/BreadCrumbComp";

const route = [{routeName: 'CRUD TYPES' , routePath:'/CRUDTYPES'} ];


class CRUDTYPES extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url:'http://172.16.1.102:6060/api/v1/getdata',
            data:[],

            columns: [
                { title: 'CRUD_TYPE_NAME', field: 'CRUD_TYPE_NAME' },
            ],
            title:'CRUD TYPES '

        }
    }

    componentDidMount(){
        axios({
            method: 'post',
            url:this.state.url,
            data:{
                fun_name:"FU_DOC_CRUD_TYPES",
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
                        {/*<MenuAppBar title='CRUD TYPES'/>*/}
                        <br/>
                        <BreadCrumbComp routes = {route}/>
                        <br/>
                    </div>
                </div>
                <div className = "row">
                    <div className="col-12">
                        <CRUDTYPESGrid data = {this.state.data} columns = {this.state.columns} title = {this.state.title} />
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter( CRUDTYPES);