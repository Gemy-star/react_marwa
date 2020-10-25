import React, {Component} from 'react';
import axios from 'axios';
import ScreenComponentGird from "../../Components/SCREENCOMPONENTGird/ScreenComponentGird";
import {Route, Switch, withRouter} from "react-router-dom";
import MenuAppBar from '../../Components/AppBar/AppBar';
import BreadCrumbComp from "../../Components/BreadCrumbComp/BreadCrumbComp";
import {getData} from "../../Data/Data";
import NavNew from "../../Components/Drawer/NavNew";

const route = [{routeName: 'Applications', routePath: '/'}, {routeName: 'Projects', routePath: '/ProjectsPage'},
    {routeName: 'Modules', routePath: '/module'}, {
        routeName: 'Screen',
        routePath: '/screens'
    }, {routeName: 'components', routePath: '/components'}];

class ComponentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: getData,
            data: [],
            // SCREEN_ID : this.props.location.state.id ,
            SCREEN_ID: sessionStorage.getItem("Screen_ID"),
            columns: [
                {title: 'COMP_NAME', field: 'COMP_NAME'},
                {title: 'COMP_DESC', field: 'COMP_DESC'},
                {title: 'Comp Type', field: 'COMP_TYPE_NAME'},

            ],
            title: 'Component Type'
        }
    }

    componentDidMount() {
        axios({
            method: 'post',
            url: this.state.url,
            data: {
                fun_name: "FU_DOC_SCREEN_COMPONENT2",
                param_name: ["P_SCREEN_ID"],
                param_value: [this.state.SCREEN_ID]
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
                <div className="row">
                    <div className="col-12">
                        <NavNew routes={route}/>
                        {/*<MenuAppBar title='Application/Project/Module/screen/Components'/>*/}
                        <br/>
                        <br/>
                        <br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <ScreenComponentGird data={this.state.data} columns={this.state.columns}
                                             title={this.state.title} mod_id={this.state.MOD_ID}/></div>
                </div>
            </div>
        );
    }

}

export default withRouter(ComponentPage);


