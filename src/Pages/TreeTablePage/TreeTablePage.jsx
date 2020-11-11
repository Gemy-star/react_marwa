import  React, {useState, useEffect  } from 'react';
import BasicTreeData from '../../Components/EditableTreeTable/EditableTreeTable'
import axios from 'axios';
import {getData} from "../../Data/Data";
import NavNew from "../../Components/Drawer/NavNew";
import { withRouter } from "react-router-dom";
import {Button} from "primereact/button";



window.marwa={1: "APi call", 2: "Web Service", 3: "DB Function call", 4: "DB procedure "}
const crud_type ={1: "VIEW", 2: "ADD", 3: "EDIT", 4: "DELETE"}

const route = [{routeName: 'Applications', routePath: '/'}, {routeName: 'Projects', routePath: '/ProjectsPage'},
    {routeName: 'Modules', routePath: '/module'}, {
        routeName: 'Screen',
        routePath: '/screens'
    }, {routeName: 'components', routePath: '/components'},{routeName: 'TreeTable', routePath: '/TreeTablepage'}];

const TreeTablepage =(props)=>
{

    const [combodata,setCombodata] =useState({})

    useEffect(()=> {
        const Data = async()=>
        {
           const payload = await axios({
                method: 'post',
                url: getData,
                data: {
                    fun_name: "FU_DOC_DEPENDANCY_TYPES",
                    param_name: [],
                    param_value: []
                }
            })
                const result = payload.data.Table;

            var obj = result.reduce(function(acc, cur, i) {
                console.log(cur);
                acc[cur.DEP_TYPE_ID] = cur.DEP_TYPE_NAME;
                return acc;
            }, {});
            //obj;
               setCombodata(obj)

         }

        Data();

        },[]

    )
  const  onHide = () => {
        window.history.back();
    }

//console.log(combodata)
    return(
        <div>
            <NavNew routes = {route} />
            <br/>
            <br/>
            <br/>
            <hr/>
            <BasicTreeData combodata={window.marwa} com_crud = {crud_type} id={props.location.state.id} />
            <br/>
            <br/>
            <br/>
            <hr/>
            <Button icon="pi pi-angle-double-left" onClick={() => onHide()}/>

        </div>


    )
}

export default withRouter(TreeTablepage);