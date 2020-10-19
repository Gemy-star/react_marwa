

import React from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import PathComponent from "../PathComponent/PathComponent";

const CRUDGrid = (props) => {
    const [state, setState] = React.useState({
        columns: props.columns,
        data: props.data,
        title : props.title
    });

    const  path = [{PathName: "Application", value:sessionStorage.getItem("APP_Name")},{PathName: "Project", value:sessionStorage.getItem("PROJ_NAME")}]
    return (
<div>
    <PathComponent Path={path}/>

        <MaterialTable
            title= {props.title}
            columns={props.columns}
            data={props.data}
            actions={[
                {
                    icon: 'save',
                    tooltip: 'Save User',
                    onClick: (event, rowData) => {
                        let state =  {id:rowData.MOD_ID , name:rowData.MOD_NAME}
                        props.history.push('/screens',state);
                        sessionStorage.setItem("ModuleId",state.id);
                        sessionStorage.setItem("ModuleName",state.name);
                    }
                },]}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            axios({
                                method: 'post',
                                url:'http://172.16.1.102:6060/api/v1/crud',
                                data:{
                                    fun_name:"PRO_INSERT_DOC_MODULES",
                                    param_name:["P_MOD_NAME" , 'P_PROJ_ID','P_MODULE_DESC'],
                                    param_value:[newData.MOD_NAME,props.proj_id,newData.MODULE_DESC]
                                }
                            })
                                .then(response => {
                                    console.log(response.data)

                                })
                                .catch(error => console.error('timeout exceeded'))
                            window.location.reload(true)
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            console.log(newData.MOD_NAME,oldData.proj_id,newData.MODULE_DESC,oldData.MOD_ID);
                            axios({
                                method: 'post',
                                url:'http://172.16.1.102:6060/api/v1/crud',
                                data:{
                                    fun_name:"PRO_UPDATE_DOC_MODULES",
                                    param_name:["P_MOD_NAME" , 'P_PROJ_ID','P_MODULE_DESC' , 'P_MOD_ID'],
                                    param_value:[newData.MOD_NAME,oldData.PROJ_ID,newData.MODULE_DESC,oldData.MOD_ID]
                                }
                            })
                                .then(response => {
                                    console.log(response.data)

                                })
                                .catch(error => console.error('timeout exceeded'))
                            window.location.reload(true)
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            axios({
                                method: 'post',
                                url:'http://172.16.1.102:6060/api/v1/crud',
                                data:{
                                    fun_name:"PRO_DELETE_DOC_MODULES",
                                    param_name:['P_MOD_ID'],
                                    param_value:[oldData.MOD_ID]
                                }
                            })
                                .then(response => {
                                    console.log(response.data)

                                })
                                .catch(error => console.error('timeout exceeded'))
                            //marwa : to refresh the page "
                            window.location.reload(true)
                            resolve();

                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
</div>
    );
}
export default withRouter(CRUDGrid);



