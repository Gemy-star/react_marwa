import React, {Component} from 'react';
import MaterialTable from "material-table";
import axios from "axios";
import BreadCrumbComp from "../BreadCrumbComp/BreadCrumbComp";
import CRUDTYPESGrid from "../CRUDTYPES/CRUDTYPESGrid";
import {withRouter} from "react-router-dom";
 import ChromeReaderMode from "@material-ui/icons/ChromeReaderMode";
import {getData} from "../../Data/Data";
import NavNew from "../Drawer/NavNew";
import ScreenGird from "../ScreenGird/ScreenGird";
import PathComponent from "../PathComponent/PathComponent";
import EditModel from "../EditModel/EditModel";
import CardActions from "@material-ui/core/CardActions";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import Modal from "@material-ui/core/Modal";
import EditForm from "../EditForm/EditForm";

const route = [{routeName: 'Applications' , routePath:'/'} ,
    {routeName: 'Projects' , routePath:'/ProjectsPage'},
    { routeName: 'Modules' , routePath:'/module'},{ routeName: 'Screen' , routePath:'/screens'},
    {routeName: 'Component' , routePath:'/components'},{routeName: 'TreeComp' , routePath:'/TreeComp'}];

const  path = [{PathName: "Application", value:sessionStorage.getItem("APP_Name")},
    {PathName: "Project", value:sessionStorage.getItem("PROJ_NAME")},
    {PathName: "Module", value:sessionStorage.getItem("ModuleName")},
{PathName: "Components", value:sessionStorage.getItem("Component_Name")}]

// getModalStyle is not a pure function, we roll the style only on the first render

class TreeComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url:getData,
            data:[],
            Component_ID: sessionStorage.getItem("Component_ID"),
            open:false,
        }
    }
     handleOpen = () => {
        this.setState({open:true});
        alert(1)
    };

     handleClose = () => {
         this.setState({open:false});
    };

     body = (
         <EditForm currentPage="TreeTable"  /*app ={this.state.data[]} handleEdit = {props.onClick} onclose={handleClose}*//>
        )
    componentDidMount(){
        axios({
            method: 'post',
            url:this.state.url,
            data:{
                fun_name:"FU_DOC_SCREEN_COMP_DEP",
                param_name:["P_COMP_ID"],
                param_value:[1]
            }
        })
            .then(response => {
                this.setState({data: response.data.Table})
            })
            .catch(error => console.error('timeout exceeded'))

    }
    render() {
        console.log(this.state.data)
        // Donot return
        // Parameters
        return (
            <div>
                <br/>
                <br/>
                <br/>
                <br/>
                <PathComponent Path={path}/>
                <div className = "row">
                    <div className="col-12">
                        <NavNew routes = {route}/>
                        {/*<MenuAppBar title='Screens'/>*/}
                        <br/>
                        <br/>
                    </div>
                </div>
                <div className = "row">
                    <div className="col-12">
                        <MaterialTable
                            title="Basic Tree Data Preview"
                            data={this.state.data}
                            actions={[
                                {
                                    icon: EditIcon,
                                    tooltip: 'Save User',
                                    onClick: (event, rowData) => alert("You saved " + rowData.name)
                                },
                                rowData => ({
                                    icon: 'save',
                                    tooltip: 'CompDepReturn',
                                    onClick: (event, rowData) => {
                                        let state =  {id:rowData.DEP_ID, name:rowData.DEP_NAME}
                                        this.props.history.push('/CompDepReturn', state.id);
                                        sessionStorage.setItem("P_DEP_ID",state.id)
                                        sessionStorage.setItem("P_DEP_NAME",state.name)
                                    },
                                    disabled: rowData.RETURN_FLAG === 'Donot return'
                                }),
                                rowData => ({
                                    icon: 'save',
                                    tooltip: 'CompDepParmters',
                                    onClick: (event, rowData) => {
                                        let state =  {id:rowData.DEP_ID, name:rowData.DEP_NAME}
                                        this.props.history.push('/CompDepParmters', state.id);
                                        sessionStorage.setItem("P_DEP_ID",state.id)
                                        sessionStorage.setItem("P_DEP_NAME",state.name)
                                    },
                                    disabled: rowData.PARAMETER_FLAG === 'Donot Parameters'
                                })
                            ]}
                            columns={[
                                { title: 'DEP_NAME', field: 'DEP_NAME' },
                                { title: 'DEP_TYPE_NAME', field: 'DEP_TYPE_NAME' },
                                { title: 'CRUD_TYPE_NAME', field: 'CRUD_TYPE_NAME' },
                                { title: 'RETURN_FLAG', field: 'RETURN_FLAG' },
                                { title: 'PARAMETER_FLAG', field: 'PARAMETER_FLAG' },
                            ]}
                            parentChildData={

                                (row, rows) => rows.find(a => a.DEP_ID === row.DEP_DEP_ID)
                            }
                            // options={{
                            //     selection: true,
                            // }}
                        />
                    </div>
                </div>

                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {this.body}
                </Modal>
            </div>
        )
    }

}
export default withRouter( TreeComp);

