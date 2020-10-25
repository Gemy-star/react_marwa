import React, {Component} from 'react';
import MaterialTable from "material-table";
import axios from "axios";
import BreadCrumbComp from "../BreadCrumbComp/BreadCrumbComp";
import CRUDTYPESGrid from "../CRUDTYPES/CRUDTYPESGrid";
import {withRouter} from "react-router-dom";
 import ChromeReaderMode from "@material-ui/icons/ChromeReaderMode";
import {getData} from "../../Data/Data";

class TreeComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url:getData,
            data:[],
        }
    }

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
        return (
            <MaterialTable
                title="Basic Tree Data Preview"
                data={this.state.data}
                // actions={[
                //     {
                //         icon: ChromeReaderMode,
                //         tooltip: 'show details',
                //         // onClick: (event, rowData) => {
                //         //     let state =  {id:rowData.SCREEN_ID }
                //         //     props.history.push('/components', state);
                //         //
                //         // }
                //     },]}
                columns={[
                    { title: 'DEP_NAME', field: 'DEP_NAME' },
                    { title: 'DEP_TYPE_NAME', field: 'DEP_TYPE_NAME' },
                    { title: 'CRUD_TYPE_NAME', field: 'CRUD_TYPE_NAME' },
                    { title: 'RETURN_FLAG', field: 'RETURN_FLAG' },
                    { title: 'RETURN_ICON', field: 'RETURN_ICON' },
                    { title: 'PARAMETER_FLAG', field: 'PARAMETER_FLAG' },
                    { title: 'PARAMETER_ICON', field: 'PARAMETER_ICON' },

                ]}
                 parentChildData={(row, rows) => rows.find(a => a.DEP_ID === row.DEP_DEP_ID)}
                 // options={{
                 //     selection: true,
                 // }}
            />
        )
    }

}
export default withRouter( TreeComp);

