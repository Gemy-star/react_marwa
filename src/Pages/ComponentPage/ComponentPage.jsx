import React, {Component} from 'react';
import axios from 'axios';
import {Route, Switch, withRouter} from "react-router-dom";
import NavNew from "../../Components/Drawer/NavNew";
import  CrudGird  from '../../Components/CrudGird/CrudGird';

const route = [{routeName: 'Applications', routePath: '/'}, {routeName: 'Projects', routePath: '/ProjectsPage'},
    {routeName: 'Modules', routePath: '/module'}, {
        routeName: 'Screen',
        routePath: '/screens'
    }, {routeName: 'components', routePath: '/components'}];
 
    
    class ComponentPage extends Component {
        constructor(props) {
            super(props);
            this.state = {
                data:[],
                combo:[],
                screen_id:this.props.location.state.id
            }
    
        }
        componentDidMount() {
            axios({
                method: 'post',
                url:'http://172.16.1.102:6060/api/v1/getdata',
                data:{
                    fun_name:"FU_DOC_COMPONENT_TYPES",
                    param_name:[],
                    param_value:[]
                }
    
            })
                .then(response => {
                    console.log(response.data.Table)
                    this.setState({combo: response.data.Table})
    
                })
                .catch(error => console.error('timeout exceeded'))
            axios({
                method: 'post',
                url:'http://172.16.1.102:6060/api/v1/getdata',
                data:{
                    fun_name:"FU_DOC_SCREEN_COMPONENT2",
                    param_name:["P_SCREEN_ID"],
                    param_value:[this.state.screen_id]
                }
    
            })
                .then(response => {
                    console.log(response.data.Table)
                    this.setState({data: response.data.Table})
    
                })
                .catch(error => console.error('timeout exceeded'))
        }
        render() {
            return (
                <div>
                    <NavNew routes = {route}/>
                    <br/>
                    <br/>
                    <br/>
                    <hr/>
                    <CrudGird  data = {this.state.data} combo={this.state.combo} screen_id = {this.props.location.state.id}/>
                </div>
            );
        }
    
    }
    
export default withRouter(ComponentPage);





