import React from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import {CrudData} from "../../Data/Data";

const CRUDTYPESGrid = (props) => {
    debugger
    const [state, setState] = React.useState({
        columns: props.columns,
        data: props.data,
        title : props.title
    });

    return (


        <MaterialTable
            title= {props.title}
            columns={props.columns}
            data={props.data}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            axios({
                                method: 'post',
                                url:CrudData,
                                data:{
                                    fun_name:"PRO_INSERT_DOC_CRUD_TYPES",
                                    param_name:['P_CRUD_TYPE_NAME'],
                                    param_value:[newData.CRUD_TYPE_NAME]
                                }
                            })
                                .then(response => {

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
                            axios({
                                method: 'post',
                                url:CrudData,
                                data:{
                                    fun_name:"PRO_UPDATE_DOC_CRUD_TYPES",
                                    param_name:["P_CRUD_TYPE_ID" , 'P_CRUD_TYPE_NAME'],
                                    param_value:[newData.CRUD_TYPE_ID,newData.CRUD_TYPE_NAME]
                                }
                            })
                                .then(response => {

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
                                url:CrudData,
                                data:{
                                    fun_name:"PRO_DELETE_DOC_CRUD_TYPES",
                                    param_name:['P_CRUD_TYPE_ID'],
                                    param_value:[oldData.CRUD_TYPE_ID]
                                }
                            })
                                .then(response => {

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
    );
}
export default withRouter(CRUDTYPESGrid);