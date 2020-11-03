import React, { Component } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import './CrudGird.css';
import {CrudData} from "../../Data/Data";

export class DepParmtersGrid extends Component {

    emptyDOC_SCREEN_COMPONENT = {
        PARAM_ID: null,
        PARAM_NAME: "",
        PARAM_TYPE: null,
        DEP_ID: "",
    };

    constructor(props) {
        super(props);

        this.state = {
            DOC_SCREEN_COMPONENTS: props.data,
            DOC_SCREEN_COMPONENTDialog: false,
            deleteDOC_SCREEN_COMPONENTDialog: false,
            deleteDOC_SCREEN_COMPONENTSDialog: false,
            DOC_SCREEN_COMPONENT: this.emptyDOC_SCREEN_COMPONENT,
            selectedDOC_SCREEN_COMPONENTS: null,
            submitted: false,
            globalFilter: null,
            ID:null,
            NAME : null,
        };

        // this.productService = new ProductService();

    }

    componentDidMount() {


    }


    openNew = () =>  {
        this.setState({
            DOC_SCREEN_COMPONENT: this.emptyDOC_SCREEN_COMPONENT,
            submitted: false,
            DOC_SCREEN_COMPONENTDialog: true
        });
    }

    hideDialog = ()=> {
        this.setState({
            submitted: false,
            DOC_SCREEN_COMPONENTDialog: false
        });
    }

    hideDeleteDOC_SCREEN_COMPONENTDialog = ()=> {
        this.setState({ deleteDOC_SCREEN_COMPONENTDialog: false });
    }

    hideDeleteDOC_SCREEN_COMPONENTSDialog = () =>  {
        this.setState({ deleteDOC_SCREEN_COMPONENTSDialog: false });
    }

    saveDOC_SCREEN_COMPONENT = () =>  {
        let state = { submitted:true };
        //console.log((this.props.combo))
        if (this.state.DOC_SCREEN_COMPONENT.PARAM_NAME.trim()) {
            let DOC_SCREEN_COMPONENTS = [...this.state.DOC_SCREEN_COMPONENTS];
            let DOC_SCREEN_COMPONENT = {...this.state.DOC_SCREEN_COMPONENT};
            if (this.state.DOC_SCREEN_COMPONENT.PARAM_ID) {
                const index = this.findIndexById(this.state.DOC_SCREEN_COMPONENT.PARAM_ID);

                DOC_SCREEN_COMPONENTS[index] = DOC_SCREEN_COMPONENT;
                this.toast.show({ severity: 'success', summary: 'Successful', detail: 'DOC Updated', life: 3000 });
            }
            else {
                DOC_SCREEN_COMPONENT.PARAM_ID = this.createId();
                DOC_SCREEN_COMPONENT.PARAM_NAME = 'product-placeholder.svg';
                DOC_SCREEN_COMPONENTS.push(DOC_SCREEN_COMPONENT);
                this.toast.show({ severity: 'success', summary: 'Successful', detail: 'DOC Created', life: 3000 });
            }

            state = {
                ...state,
                DOC_SCREEN_COMPONENTS,
                DOC_SCREEN_COMPONENTDialog: false,
                DOC_SCREEN_COMPONENT: this.emptyDOC_SCREEN_COMPONENT
            };
        }
        this.setState(state);
        console.log(this.state.DOC_SCREEN_COMPONENT.DEP_ID)
        axios({
            method: 'post',
            url:CrudData,
            data:{
                fun_name:"PRO_INSERT_DOC_C_D_PARAMETERS",
                param_name:['P_PARAM_NAME','P_PARAM_TYPE' , 'P_DEP_ID'],
                param_value:[this.state.DOC_SCREEN_COMPONENT.PARAM_NAME,this.state.DOC_SCREEN_COMPONENT.PARAM_TYPE,this.state.DOC_SCREEN_COMPONENT.DEP_ID]
            }

        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.error('timeout exceeded'))
        window.location.reload()

    }

    editDOC_SCREEN_COMPONENT = (DOC_SCREEN_COMPONENT) => {
        this.setState({
            DOC_SCREEN_COMPONENT: { ...DOC_SCREEN_COMPONENT },
            DOC_SCREEN_COMPONENTDialog: true
        });

        axios({
            method: 'post',
            url:'http://172.16.1.102:6060/api/v1/crud',
            data:{
                fun_name:"PRO_UPDATE_DOC_C_D_PARAMETERS",
                param_name:["P_PARAM_ID" , 'P_PARAM_NAME','P_PARAM_TYPE' , 'P_DEP_ID'],
                param_value:[DOC_SCREEN_COMPONENT.PARAM_ID,DOC_SCREEN_COMPONENT.PARAM_NAME,DOC_SCREEN_COMPONENT.PARAM_TYPE,DOC_SCREEN_COMPONENT.DEP_ID]
            }

        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.error('timeout exceeded'))

    }

    confirmDeleteDOC_SCREEN_COMPONENT = (DOC_SCREEN_COMPONENT) => {
        this.setState({
            DOC_SCREEN_COMPONENT,
            deleteDOC_SCREEN_COMPONENTDialog: true
        });
        axios({
            method: 'post',
            url:'http://172.16.1.102:6060/api/v1/crud',
            data:{
                fun_name:"PRO_DELETE_DOC_C_D_PARAMETERS",
                param_name:["P_PARAM_ID"],
                param_value:[DOC_SCREEN_COMPONENT.PARAM_ID]
            }

        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.error('timeout exceeded'))

    }

    deleteDOC_SCREEN_COMPONENTS = () => {
        let DOC_SCREEN_COMPONENTS = this.state.DOC_SCREEN_COMPONENTS.filter(val => val.PARAM_ID !== this.state.DOC_SCREEN_COMPONENTS.PARAM_ID);
        this.setState({
            DOC_SCREEN_COMPONENTS,
            deleteDOC_SCREEN_COMPONENTDialog: false,
            DOC_SCREEN_COMPONENT: this.emptyDOC_SCREEN_COMPONENT
        });
        window.location.reload()
        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'DOC_SCREEN_COMP Deleted', life: 3000 });

    }

    findIndexById = (id)=> {
        let index = -1;
        for (let i = 0; i < this.state.DOC_SCREEN_COMPONENTS.length; i++) {
            if (this.state.DOC_SCREEN_COMPONENTS[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    exportCSV = () =>{
        this.dt.exportCSV();
    }

    confirmDeleteSelected = () => {
        this.setState({ deleteDOC_SCREEN_COMPONENTDialog: true });
    }

    deleteSelectedDOC_SCREEN_COMPONENTS = () => {
        let DOC_SCREEN_COMPONENTS = this.state.DOC_SCREEN_COMPONENTS.filter(val => !this.state.selectedDOC_SCREEN_COMPONENTS.includes(val));
        this.setState({
            DOC_SCREEN_COMPONENTS,
            deleteDOC_SCREEN_COMPONENTSDialog: false,
            selectedDOC_SCREEN_COMPONENTS: null
        });
        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'DOC_SCREEN_COMPONENTS Deleted', life: 3000 });
    }

    onIDChange =  (e) => {
        let DOC_SCREEN_COMPONENT = {...this.state.DOC_SCREEN_COMPONENT};
        DOC_SCREEN_COMPONENT['ID'] = e.value;
        this.setState({ DOC_SCREEN_COMPONENT });
    }

    onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let DOC_SCREEN_COMPONENT = {...this.state.DOC_SCREEN_COMPONENT};
        DOC_SCREEN_COMPONENT[`${name}`] = val;

        this.setState({ DOC_SCREEN_COMPONENT : DOC_SCREEN_COMPONENT });
        console.log(this.state.DOC_SCREEN_COMPONENT);


    }



    leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={this.openNew} />
            </React.Fragment>
        )
    }


    actionBodyTemplate = (rowData) =>  {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => this.editDOC_SCREEN_COMPONENT(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteDOC_SCREEN_COMPONENT(rowData)} />
            </React.Fragment>
        );
    }

    render() {
        const header = (
            <div className="table-header">
                <h5 className="p-m-0">Manage DOC_SCREEN_COMPONENT</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Search..." />
                </span>
            </div>
        );
        const DOC_SCREEN_COMPONENTDialogFooter = (
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveDOC_SCREEN_COMPONENT} />
            </React.Fragment>
        );
        const deleteDOC_SCREEN_COMPONENTDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteDOC_SCREEN_COMPONENTDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteDOC_SCREEN_COMPONENTS} />
            </React.Fragment>
        );
        const deleteDOC_SCREEN_COMPONENTsDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteDOC_SCREEN_COMPONENTDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.hideDeleteDOC_SCREEN_COMPONENTSDialog} />
            </React.Fragment>
        );

        return (
            <div className="datatable-crud-demo">
                <Toast ref={(el) => this.toast = el} />

                    <Toolbar className="p-mb-4" left={this.leftToolbarTemplate} ></Toolbar>

                    <DataTable ref={(el) => this.dt = el} value={this.props.data} selection={this.state.selectedDOC_SCREEN_COMPONENTS} onSelectionChange={(e) => this.setState({ selectedDOC_SCREEN_COMPONENTS: e.value })}
                               dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                               currentPageReportTemplate="Showing {first} to {last} of {totalRecords} DOC_COMP"
                               globalFilter={this.state.globalFilter}
                               header={header}>

                        <Column field="PARAM_ID" header="PARAM_ID" sortable></Column>
                        <Column field="PARAM_NAME" header="PARAM_NAME" sortable></Column>
                        <Column field="PARAM_TYPE" header="PARAM_TYPE"  sortable></Column>
                        <Column body={this.actionBodyTemplate}></Column>
                    </DataTable>

                <Dialog visible={this.state.DOC_SCREEN_COMPONENTDialog} style={{ width: '450px' }} header="DOC_SCREEN_COMPONENT Details" modal className="p-fluid" footer={DOC_SCREEN_COMPONENTDialogFooter} onHide={this.hideDialog}>
                    <div className="p-field">
                        <label htmlFor="description">PARAM_NAME</label>
                        <InputTextarea id="description" value={this.state.DOC_SCREEN_COMPONENT.PARAM_NAME} onChange={(e) => this.onInputChange(e, 'PARAM_NAME')} required rows={3} cols={20} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="description">NAME</label>
                        <Dropdown optionLabel="NAME" optionValue="ID" value={this.state.ID} options={this.props.combo} onChange={(e) => {
                            this.onInputChange(e,'ID')
                            this.setState({ID:e.target.value})
                            console.log(this.state.NAME)}} placeholder="Select a TYPE"/>
                    </div>


                </Dialog>

                <Dialog visible={this.state.deleteDOC_SCREEN_COMPONENTDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDOC_SCREEN_COMPONENTDialogFooter} onHide={this.hideDeleteDOC_SCREEN_COMPONENTDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.DOC_SCREEN_COMPONENT && <span>Are you sure you want to delete <b>{this.state.DOC_SCREEN_COMPONENT.PARAM_NAME}</b>?</span>}
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteDOC_SCREEN_COMPONENTSDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDOC_SCREEN_COMPONENTDialogFooter} onHide={this.hideDeleteDOC_SCREEN_COMPONENTSDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.DOC_SCREEN_COMPONENT && <span>Are you sure you want to delete the selected COMPONENTS?</span>}
                    </div>
                </Dialog>
            </div>
        );
    }
}