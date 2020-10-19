import React from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import PathComponent from "../PathComponent/PathComponent";

const ScreenGird = (props) => {
    debugger
    const [state, setState] = React.useState({
        columns: props.columns,
        data: props.data,
        title : props.title
    });
    const  path = [{PathName: "Application", value:sessionStorage.getItem("APP_Name")},{PathName: "Project", value:sessionStorage.getItem("PROJ_NAME")},{PathName: "Module", value:sessionStorage.getItem("ModuleName")}]

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
                        let state =  {id:rowData.SCREEN_ID,name:rowData.SCREEN_NAME_A}
                        props.history.push('/components', state);
                        sessionStorage.setItem("Screen_ID",state.id)
                        sessionStorage.setItem("Screen_Name",state.name)

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
                                    fun_name:"PRO_INSERT_DOC_SCREENS",
                                    param_name:['P_SCREEN_NAME_A' ,'P_SCREEN_NAME_E' , 'P_MOD_ID' , 'P_SCREEN_DESC'],
                                    param_value:[newData.SCREEN_NAME_A ,newData.SCREEN_NAME_E ,props.mod_id, newData.SCREEN_DESC]
                                }
                            })
                                .then(response => {
                                    console.log(response.data)

                                })
                                .catch(error => console.error('timeout exceeded'))
                            //window.location.reload(true)
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                            let MOD_ID1 =  {id:newData.MOD_ID }
                            props.history.push('/screens', MOD_ID1);
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            // console.log(newData.MOD_NAME,oldData.proj_id,newData.MODULE_DESC,oldData.MOD_ID);
                            axios({
                                method: 'post',
                                url:'http://172.16.1.102:6060/api/v1/crud',
                                data:{
                                    fun_name:"PRO_UPDATE_DOC_SCREENS",
                                    param_name:["P_SCREEN_ID" , 'P_SCREEN_NAME_A','P_SCREEN_NAME_E' , 'P_MOD_ID','P_SCREEN_DESC'],
                                    param_value:[newData.SCREEN_ID,newData.SCREEN_NAME_A,newData.SCREEN_NAME_E,oldData.MOD_ID , newData.SCREEN_DESC]
                                }
                            })
                                .then(response => {
                                    console.log(response.data)

                                })
                                .catch(error => console.error('timeout exceeded'))
                            //window.location.reload(true)
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                            let MOD_ID1 =  {id:newData.MOD_ID }
                            props.history.push('/screens', MOD_ID1);
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            axios({
                                method: 'post',
                                url:'http://172.16.1.102:6060/api/v1/crud',
                                data:{
                                    fun_name:"PRO_DELETE_DOC_SCREENS",
                                    param_name:['P_SCREEN_ID'],
                                    param_value:[oldData.SCREEN_ID]
                                }
                            })
                                .then(response => {
                                    console.log(response.data)

                                })
                                .catch(error => console.error('timeout exceeded'))
                            //marwa : to refresh the page "
                           window.location.reload(false)

                            resolve();

                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });

                            // let MOD_ID1 =  {id:oldData.MOD_ID }
                            // alert(MOD_ID1)
                            // props.history.push('/screens', MOD_ID1);
                        }, 600);
                    }),
            }}
        />
</div>
    );
}
export default withRouter(ScreenGird);


