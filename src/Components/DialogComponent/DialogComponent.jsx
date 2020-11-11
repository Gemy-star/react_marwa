import React, {Component} from 'react';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import './Dialog.css';
import {Dropdown} from "primereact/dropdown";
import NavNew from "../Drawer/NavNew";
import { withRouter } from "react-router-dom";
import axios from "axios";
import {CrudData, getData} from "../../Data/Data";
import { InputText } from 'primereact/inputtext';


class DialogComponent extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            display: false,
            position: 'center',
            selectedCrudName: null,
            selectedCrud : null ,
            selectedDepTypeID : null ,
            selectedDepType: null,
            selectedDepTypeNAME: null,
            selectedReturnFlag: null,
            selectedReturnParam: null,
            DEP_NAME : this.props.location.state.update ? this.props.location.state.DEP_NAME : "",
            CrudNames: [],
            DepTypes: [],
            PF: [{label: 'Return', value: '1'} ,{label: 'Dont Return', value: '0'} ],
            RF: [{label: 'Return', value: '1'} ,{label: 'Dont Return', value: '0'} ],
            route: [{routeName: 'Applications', routePath: '/'}, {routeName: 'Projects', routePath: '/ProjectsPage'},
                {routeName: 'Modules', routePath: '/module'}, {
                    routeName: 'Screen',
                    routePath: '/screens'
                }, {routeName: 'components', routePath: '/components'}, {
                    routeName: 'TreeTable',
                    routePath: '/TreeTablepage'
                }]
        };


    }

    componentDidMount() {
        axios({
            method: 'post',
            url:getData,
            data:{
                fun_name:"FU_DOC_COMPONENT_TYPES",
                param_name:[],
                param_value:[]
            }

        })
            .then(response => {
                console.log(response.data.Table)
                this.setState({CrudNames: response.data.Table})

            })
            .catch(error => console.error('timeout exceeded'))

        axios({
            method: 'post',
            url:getData,
            data:{
                fun_name:"FU_DOC_DEPENDANCY_TYPES",
                param_name:[],
                param_value:[]
            }

        })
            .then(response => {
                console.log(response.data.Table)
                this.setState({DepTypes: response.data.Table})

            })
            .catch(error => console.error('timeout exceeded'))
    }


    onClick = () => {
      if (this.props.location.state.update) {
          axios({
              method: 'post',
              url:CrudData,
              data:{
                  fun_name:"PRO_UPDATE_DOC_SCREEN_COMP_DEP",
                  param_name:['P_DEP_ID' , 'P_DEP_NAME' , 'P_DEP_TYPE_ID' , 'P_RETURN_FLAG' , 'P_PARAMETER_FLAG','P_COMP_ID' , 'P_DEP_DEP_ID' , 'P_CRUD_TYPE_ID'],
                  param_value:[this.props.location.state.DEP_ID , this.state.DEP_NAME ,this.state.selectedDepTypeID,this.state.selectedReturnFlag , this.state.selectedReturnParam  ,
                   this.props.location.state.COMP_ID , this.props.location.state.DEP_ID , this.state.selectedCrudName  ]
              }

          })
              .then(response => {
                  console.log(response)

                  if (response.data === 1){
                      window.history.back();

                  }

              })
              .catch(error => console.error('timeout exceeded'))
      }else {
          axios({
              method: 'post',
              url:CrudData,
              data:{
                  fun_name:"PRO_INSERT_DOC_SCREEN_COMP_DEP",
                  param_name:['P_DEP_NAME' , 'P_DEP_TYPE_ID' , 'P_RETURN_FLAG' , 'P_PARAMETER_FLAG','P_COMP_ID' , 'P_DEP_DEP_ID' , 'P_CRUD_TYPE_ID'],
                  param_value:[ this.state.DEP_NAME ,this.state.selectedDepTypeID,this.state.selectedReturnFlag , this.state.selectedReturnParam  ,
                      this.props.location.state.COMP_ID , this.props.location.state.DEP_ID , this.state.selectedCrudName  ]
              }

          })
              .then(response => {
                  console.log(response)

                  if (response.data === 1){
                      window.history.back();

                  }

              })
              .catch(error => console.error('timeout exceeded'))
      }
    }

    onHide = () => {
        window.history.back();
    }


    render() {
        return (

            <div>
                <NavNew routes = {this.state.route}/>
                <br/>
                <br/>
                <br/>
                <br/>
                <hr/>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="CrudType">CRUD TYPE NAME</label>
                        <Dropdown inputId="CrudType" value={this.state.selectedCrudName} options={this.state.CrudNames}
                                  onChange={(e) => {
                                      this.setState({selectedCrudName: e.value})
                                  }} placeholder="Select CRUD TYPE NAME" optionLabel="COMP_TYPE_NAME" optionValue="COMP_TYPE_ID"/>

                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="DEPTYPE">DEP TYPE NAME</label>
                        <Dropdown inputId="DEPTYPE" value={this.state.selectedDepTypeID} options={this.state.DepTypes}
                                  onChange={(e) => {
                                      this.setState({selectedDepTypeID: e.value , selectedDepType:this.state.DepTypes.filter( i => i.DEP_TYPE_ID === this.state.selectedDepTypeID )})
                                      console.log()
                                  }}  placeholder="Select DEP TYPE NAME"  optionLabel="DEP_TYPE_NAME" optionValue="DEP_TYPE_ID"/>

                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="RF">Return Flag</label>
                        <Dropdown inputId="RF" value={this.state.selectedReturnFlag} options={this.state.RF}
                                  onChange={(e) => {
                                      this.setState({selectedReturnFlag: e.value})
                                  }} placeholder="Select Return Flag" optionLabel="label" optionValue="value"/>

                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="PF">Parameter Flag</label>
                        <Dropdown inputId="PF" value={this.state.selectedReturnParam} options={this.state.PF}
                                  onChange={(e) => {
                                      this.setState({selectedReturnParam: e.value})
                                  }} placeholder="Select Parameter Flag" optionLabel="label" optionValue="value"/>

                    </div>

                    <div className="p-field p-col-12 p-md-6">
                       < label htmlFor="DEP_NAME" className="p-d-block">DEP NAME</label>
                    <InputText id="DEP_NAME" aria-describedby="DEP_NAME_help" className="p-invalid p-d-block"  value={this.state.DEP_NAME} onChange={(e) => this.setState({DEP_NAME: e.target.value})} />

                    </div>
                </div>

                <Button icon="pi pi-check" onClick={() => this.onClick()}/>
                <Button icon="pi pi-angle-double-left" onClick={() => this.onHide()}/>

            </div>
        );
    }

}

export default withRouter(DialogComponent);

