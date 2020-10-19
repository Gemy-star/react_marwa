import React from 'react';
import SignInPass from "../../Components/SignInPass/SignInPass";
import { withRouter } from "react-router-dom";

const LoginStepTwoPage = props =>  {
    return (<div>
        <SignInPass username={props.location.state.username} fullName={props.location.state.full_name}/>
    </div>)
}

export default withRouter(LoginStepTwoPage);