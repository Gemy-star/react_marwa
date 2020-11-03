import React from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import PathComponent from "../PathComponent/PathComponent";
import ChromeReaderMode from "@material-ui/icons/ChromeReaderMode";
import {CrudData} from "../../Data/Data";

const ScreenComponentGird = (props) => {
    debugger
    const [state, setState] = React.useState({
        columns: props.columns,
        data: props.data,
        title : props.title
    });
    const  path = [{PathName: "Application", value:sessionStorage.getItem("APP_Name")},
        {PathName: "Project", value:sessionStorage.getItem("PROJ_NAME")},
        {PathName: "Module", value:sessionStorage.getItem("ModuleName")},
        {PathName: "Screen", value:sessionStorage.getItem("Screen_Name")}]

    return (

<div>
    <PathComponent Path={path}/>
        <MaterialTable
            title= {props.title}
            columns={props.columns}
            data={props.data}
            actions={[
                {
                    icon: ChromeReaderMode,
                    tooltip: 'show details',
                    onClick: (event, rowData) => {
                        let state =  {id:rowData.COMP_ID ,name:rowData.COMP_NAME}
                        props.history.push('/TreeTablepage', state);
                        console.log(rowData.COMP_ID)
                        sessionStorage.setItem("Component_ID",rowData.COMP_ID)
                        sessionStorage.setItem("Component_Name",rowData.COMP_NAME)
                    }
                },]}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            axios({
                                method: 'post',
                                url:CrudData,
                                data:{
                                    fun_name:"PRO_INSERT_D_SCREEN_COMPONENT",
                                    param_name:['P_COMP_NAME' ,'P_COMP_TYPE_ID' , 'P_COMP_DESC' , 'P_SCREEN_ID'],
                                    param_value:[newData.COMP_NAME ,newData.COMP_TYPE_ID ,props.COMP_DESC, newData.SCREEN_DESC]
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
                            // console.log(newData.MOD_NAME,oldData.proj_id,newData.MODULE_DESC,oldData.MOD_ID);
                            axios({
                                method: 'post',
                                url:CrudData,
                                data:{
                                    fun_name:"PRO_UPDATE_D_SCREEN_COMPONENT",
                                    param_name:["P_COMP_ID" , 'P_COMP_NAME','P_COMP_TYPE_ID' , 'P_COMP_DESC','P_SCREEN_ID'],
                                    param_value:[newData.COMP_ID,newData.COMP_NAME,newData.COMP_TYPE_ID,newData.COMP_DESC , oldData.SCREEN_ID]
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
                                    fun_name:"PRO_DELETE_D_SCREEN_COMPONENT",
                                    param_name:['P_COMP_ID'],
                                    param_value:[oldData.COMP_ID]
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
export default withRouter(ScreenComponentGird);


