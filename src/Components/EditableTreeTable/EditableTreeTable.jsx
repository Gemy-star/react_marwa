import  React, {useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import axios from "axios";
import {getData} from "../../Data/Data";


const BasicTreeData=(props)=>
{
    const crud_type ={1: "VIEW", 2: "ADD", 3: "EDIT", 4: "Delete"}

    const id = props.id

    console.log(id);
    // const { useState } = React;

    //const [combo]=useState( {1: "APi call", 2: "Web Service", 3: "DB Function call", 4: "DB procedure "})
    const [combo]=useState( props.combodata)
    const combo1=props.combodata;

    const [selectedRow, setSelectedRow] = useState({"id":null,"parentId":null});
    const [hidden, sethidden]=useState(true)
    let axiosid =7

    const [data, setData] = useState([]);
    const [com, setCom] = useState([]);


    const [columns, setColumns] = useState([
        { title: 'DEP_NAME', field: 'DEP_NAME' },
        { title: 'DEP_TYPE_ID', field: 'DEP_TYPE_ID' , lookup :combo },
        { title: 'CRUD_TYPE_NAME', field: 'CRUD_TYPE_ID'  , lookup: props.com_crud},
        { title: 'RETURN_FLAG', field: 'RETURN_FLAG' },
        { title: 'PARAMETER_FLAG', field: 'PARAMETER_FLAG' },
    ]);


    const handleEsc = (event) =>
    {
        if (event.keyCode === 27) {
            setSelectedRow([null,null])
        }
    }

    const handleOnrowclick = (event,a)=>
    {
        setSelectedRow({id:a.id , parentId:a.parentId })
        sethidden (false)
    }

    useEffect(()=> {
        const Com = async()=>
        {
            const payload = await axios({
                method: 'post',
                url: getData,
                data: {
                    fun_name: "FU_DOC_CRUD_TYPES",
                    param_name: [],
                    param_value: []
                }
            })
            const result = payload.data.Table;
            console.log(result);

            setCom(result)

        }

        Com();


            const Data = async()=>
            {
                const payload = await axios({
                    method: 'post',
                    url: getData,
                    data: {
                        fun_name: "FU_DOC_SCREEN_COMP_DEP",
                        param_name: ["P_COMP_ID"],
                        param_value: [props.id]
                    }
                })
                const result = payload.data.Table;
                console.log(result);

                setData(result)

            }

            Data();

        },[]
    )
     //console.log(combo,combo1)

    return (
        <MaterialTable
            title="Basic Tree Data Preview"
            data={data}
            columns={columns}

            editable={{
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            setData([...data, {id:axiosid,...newData,parentId:selectedRow.id}]);
                            axiosid=axiosid+1
                            setSelectedRow([null,null])
                            resolve();
                        }, 1000)
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataUpdate = [...data];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;
                            setData([...dataUpdate]);

                            resolve();
                        }, 1000)
                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataDelete = [...data];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            setData([...dataDelete]);

                            resolve()
                        }, 1000)
                    }),
            }}

                    actions=
                {[
                    rowData =>(
                        {
                            icon: HighlightOffTwoToneIcon,
                            iconProps: { style: {  backgroundColor: "green" } },

                            //hidden:(selectedRow.parentId == undefined && clear == false)? false : true,
                            hidden:rowData.id == selectedRow.id ? false : true,
                            tooltip: 'clear selection',
                            onClick: (event, rowData) => {setSelectedRow([null,null])}

                        })
                ]}
            //handle expand-collapse events
            //onTreeExpandChange={ro}
            parentChildData = {
                (row, rows) => rows.find(a => a.DEP_ID === row.DEP_DEP_ID)
            }

            options=
                {{
                    headerStyle: {
                        backgroundColor: '#01579b',
                        color: '#FFF'
                    },
                    rowStyle: rowData => ({
                        backgroundColor: (selectedRow.id === rowData.id) ? '#EEE' : '#FFF'
                    }),
                    actionsColumnIndex: -1,
                }}
            onRowClick={ (evt,a)=>{ handleOnrowclick(evt,a)}}

        />
    )
}
export default BasicTreeData;