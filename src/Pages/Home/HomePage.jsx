import React from 'react';
//import Landing from "../landing_pages/landing";
import Applications from "../Applications/Applications"

import NavNew from "../../Components/Drawer/NavNew";
const route = [{routeName: 'Applications' , routePath:'/'}
]
const HomePage = props =>  {
    return (<div>
      {/*<MenuAppBar title='Applications'/>*/}
<NavNew routes = {route}/>
      <br/>
      <br/>
      <br/>
      <hr/>
        <Applications/>
    
    </div>)
}

export default HomePage;