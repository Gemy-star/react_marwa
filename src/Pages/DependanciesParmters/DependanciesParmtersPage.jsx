import React ,{Component} from 'react';
import {DepParmtersGrid} from "../../Components/DepParmtersGrid/DepParmtersGrid";
import axios from "axios";
import {withRouter} from "react-router-dom";
import {getData} from "../../Data/Data";


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            combo:[],
            P_DEP_ID:sessionStorage.getItem("P_DEP_ID")
            ,
        }

    }
    componentDidMount() {
        axios({
            method: 'post',
            url:getData,
            data:{
                fun_name:"FU_DOC_PARAM_RET_TYPES",
                param_name:[],
                param_value:[]
            }

        })
            .then(response => {

                this.setState({combo: response.data.Table})
                console.log(this.state.combo)
            })
            .catch(error => console.error('timeout exceeded'))
        axios({
            method: 'post',
            url:getData,
            data:{
                fun_name:"FU_DOC_COMP_DEP_PARAMETERS",
                param_name:["P_DEP_ID"],
                param_value:[this.state.P_DEP_ID]
            }

        })
            .then(response => {
                console.log(response.data.Table)
                this.setState({data: response.data.Table})

            })
            .catch(error => console.error('timeout exceeded'))
    }
    render() {
        return (
            <div>
                <DepParmtersGrid data = {this.state.data} combo={this.state.combo}/>
            </div>
        );
    }

}

export default withRouter(HomePage);