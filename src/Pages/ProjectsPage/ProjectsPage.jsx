import React from 'react';
import Dashboard from "../../Components/Dashboard/Dashboard";
import Pagefor from '../../Components/pagefor/pagefor';
import Project from "../../Components/Projects/Projects";
import MenuAppBar from '../../Components/AppBar/AppBar'
import BreadCrumbComp from "../../Components/BreadCrumbComp/BreadCrumbComp";
import PathComponent from "../../Components/PathComponent/PathComponent";
import { withRouter } from "react-router-dom";

const route = [{routeName: 'Applications' , routePath:'/'} , {routeName: 'Projects' , routePath:'/ProjectsPage'}];
const ProjectsPage = props =>  {
    // #################  SHOULD BE AppID bs e7na mot5lfeeeeeeeeeeeeeenn

    const proj_id = sessionStorage.getItem("App_ID");
    const AppName = sessionStorage.getItem("APP_Name");

    const Path = [{PathName: "Application", value:AppName}];

   // console.log(proj_id);
    return (
        <div>
     {/*<MenuAppBar title='Application/Projects'/>*/}
     <br/>
     <BreadCrumbComp routes = {route} proj_id={proj_id}/>
     <br/>
   <PathComponent Path = {Path} proj_id={proj_id}/>
     <br/>
       <Project proj_id={proj_id}/>
    
    </div>)
}

export default withRouter(ProjectsPage);