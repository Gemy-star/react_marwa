import React from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import PathComponent from "../PathComponent/PathComponent";
import {CrudData} from "../../Data/Data";

const CompDepParmters = (props) => {
    const [state, setState] = React.useState({
        columns: props.columns,
        data: props.data,
        title : props.title
    });
    const  path = [{PathName: "Application", value:sessionStorage.getItem("APP_Name")}
    ,{PathName: "Project", value:sessionStorage.getItem("PROJ_NAME")},{PathName: "Module", value:sessionStorage.getItem("ModuleName")}]
    return (
        <div>
            <br/><br/>
            <PathComponent Path={path}/>
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
                                        fun_name:"PRO_INSERT_DOC_C_D_PARAMETERS",
                                        param_name:['P_PARAM_NAME','P_PARAM_TYPE' , 'P_DEP_ID'],
                                        param_value:[newData.PARAM_NAME,newData.PARAM_TYPE,props.P_DEP_ID]
                                    }
                                })
                                    .then(response => {
                                        console.log(response.data)

                                    })
                                    .catch(error => console.error('timeout exceeded'))
                                resolve();
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data.push(newData);
                                    return { ...prevState, data };
                                });
                                let P_DEP_ID =  {id:newData.P_DEP_ID }
                                props.history.push('/CompDepParmters', P_DEP_ID);
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                axios({
                                    method: 'post',
                                    url:CrudData,
                                    data:{
                                        fun_name:"PRO_UPDATE_DOC_C_D_PARAMETERS",
                                        param_name:["P_PARAM_ID" , 'P_PARAM_NAME','P_PARAM_TYPE' , 'P_DEP_ID'],
                                        param_value:[oldData.PARAM_ID,newData.PARAM_NAME,newData.PARAM_TYPE,oldData.DEP_ID]
                                    }
                                })
                                    .then(response => {
                                        console.log(response.data)
                                    })
                                    .catch(error => console.error('timeout exceeded'))
                                resolve();
                                if (oldData) {
                                    setState((prevState) => {
                                        const data = [...prevState.data];
                                        data[data.indexOf(oldData)] = newData;
                                        return { ...prevState, data };
                                    });
                                }
                                let P_DEP_ID =  {id:newData.P_DEP_ID }
                                props.history.push('/CompDepParmters', P_DEP_ID);
                            }, 600);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                axios({
                                    method: 'post',
                                    url:CrudData,
                                    data:{
                                        fun_name:"PRO_DELETE_DOC_C_D_PARAMETERS",
                                        param_name:['P_PARAM_ID'],
                                        param_value:[oldData.PARAM_ID]
                                    }
                                })
                                    .then(response => {
                                        console.log(response.data)

                                    })
                                    .catch(error => console.error('timeout exceeded'))
                                    window.location.reload(false)
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
export default withRouter(CompDepParmters);


