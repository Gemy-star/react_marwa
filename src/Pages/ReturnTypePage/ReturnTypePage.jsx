import React , {Component} from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import MenuAppBar from '../../Components/AppBar/AppBar';
import ReturnTypeGrid from "../../Components/ReturnTypeGrid/ReturnTypeGrid";
import BreadCrumbComp from "../../Components/BreadCrumbComp/BreadCrumbComp";

const route = [{routeName: 'Return Type' , routePath:'/ReturnTypePage'}];


class ReturnTypePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url:'http://172.16.1.102:6060/api/v1/getdata',
            data:[],

            columns: [
                { title: 'NAME', field: 'NAME' },
            ],
            title:'RETURN TYPE '

        }
    }

    componentDidMount(){
        axios({
            method: 'post',
            url:this.state.url,
            data:{
                fun_name:"FU_DOC_PARAM_RET_TYPES",
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
                        {/*<MenuAppBar title='DEP TYPE'/>*/}
                        <br/>
                        <BreadCrumbComp routes = {route}/>
                        <br/>
                    </div>
                </div>
                <div className = "row">
                    <div className="col-12">
                        <ReturnTypeGrid data = {this.state.data} columns = {this.state.columns} title = {this.state.title} />
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter( ReturnTypePage);