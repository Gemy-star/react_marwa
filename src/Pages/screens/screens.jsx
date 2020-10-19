import React , {Component} from 'react';
import axios from 'axios';
import CRUDGrid from '../../Components/CRUDGrid/CRUDGrid';
import { withRouter } from "react-router-dom";
import MenuAppBar from '../../Components/AppBar/AppBar';
import ScreenGird from "../../Components/ScreenGird/ScreenGird";
import BreadCrumbComp from "../../Components/BreadCrumbComp/BreadCrumbComp";
import PathComponent from "../../Components/PathComponent/PathComponent";

const route = [{routeName: 'Applications' , routePath:'/'} , {routeName: 'Projects' , routePath:'/ProjectsPage'},{ routeName: 'Modules' , routePath:'/module'},{ routeName: 'Screen' , routePath:'/screens'}];

//const aya =window.$lolo;
//window.global+=({routeName: '111' , routePath:'/111'})
//window.global.push({routeName: '111' , routePath:'/111'})


class Screens extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url:'http://172.16.1.102:6060/api/v1/getdata',
            data:[],
            // MOD_ID : this.props.location.state.id ,
            MOD_ID: sessionStorage.getItem("ModuleId"),
            columns: [
                { title: 'Screen Name A', field: 'SCREEN_NAME_A' },
                { title: 'Screen Name E', field: 'SCREEN_NAME_E' },
                { title: 'Screen Description', field: 'SCREEN_DESC' },

            ],
            title:'Screens'

        }
    }

    componentDidMount(){
        axios({
            method: 'post',
            url:this.state.url,
            data:{
                fun_name:"FU_DOC_SCREENS",
                param_name:["P_MOD_ID"],
                param_value:[this.state.MOD_ID]
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
                        {/*<MenuAppBar title='Screens'/>*/}
                        <br/>
                        <BreadCrumbComp routes = {route} />
                        <br/>

                    </div>
                </div>
                <div className = "row">
                    <div className="col-12">
                     <ScreenGird data = {this.state.data} columns = {this.state.columns} title = {this.state.title} mod_id = {this.state.MOD_ID}/>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter( Screens);