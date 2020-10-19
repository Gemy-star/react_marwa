import React from 'react';
//import Landing from "../landing_pages/landing";
import Applications from "../Applications/Applications"
import MenuAppBar from '../../Components/AppBar/AppBar'
import BreadCrumbComp from "../../Components/BreadCrumbComp/BreadCrumbComp";
const route = [{routeName: 'Applications' , routePath:'/'}
]
const HomePage = props =>  {
    return (<div>
      {/*<MenuAppBar title='Applications'/>*/}

      <br/>
<BreadCrumbComp routes = {route}/>
      <br/>
      
        <Applications/>
    
    </div>)
}

export default HomePage;