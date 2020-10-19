import React  , {Component}from 'react';
import SignInSide from "../../Components/SignIn/SignIn";
import { withRouter ,browserHistory} from "@version/react-router-v3";



class LoginStepOnePage extends Component {

render() {
    return (
        <div>
        <SignInSide/>
    </div>
    )
  }
}
  


export default withRouter(LoginStepOnePage);