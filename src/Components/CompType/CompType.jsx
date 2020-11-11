import React from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import {CrudData} from "../../Data/Data";

const CompType = (props) => {
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
                                    fun_name:"PRO_INSERT_DOC_COMPONENT_TYPES",
                                    param_name:['P_COMP_TYPE_NAME'],
                                    param_value:[newData.COMP_TYPE_NAME]
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
                            axios({
                                method: 'post',
                                url:CrudData,
                                data:{
                                    fun_name:"PRO_UPDATE_DOC_COMPONENT_TYPES",
                                    param_name:["P_COMP_TYPE_ID" , 'P_COMP_TYPE_NAME'],
                                    param_value:[newData.COMP_TYPE_ID,newData.COMP_TYPE_NAME]
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
                                url:CrudData,
                                data:{
                                    fun_name:"PRO_DELETE_DOC_COMPONENT_TYPES",
                                    param_name:['P_COMP_TYPE_ID'],
                                    param_value:[oldData.COMP_TYPE_ID]
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
    );
}
export default withRouter(CompType);