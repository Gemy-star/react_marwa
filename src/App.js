import React , {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'fontsource-roboto';
import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import {Switch , Route } from 'react-router-dom';
import LoginStepOnePage from "./Pages/LoginStepOne/LoginStepOnePage";
import LoginStepTwoPage from "./Pages/LoginStepTwo/LoginStepTwoPage";
import { withRouter } from "react-router-dom";
import HomePage from './Pages/Home/HomePage';
import CRUDGrid from './Components/CRUDGrid/CRUDGrid';
import Screens from './Pages/screens/screens';
import Project from "./Components/Projects/Projects";
import ProjectsPage from './Pages/ProjectsPage/ProjectsPage';
import ModulePage from './Pages/ModulesPage/ModulePage';
import ComponentPage from "./Pages/ComponentPage/ComponentPage";
import CRUDTYPES from "./Pages/CrudTypePage/CRUDTYPES";
import  DependancyTypePage from "./Pages/DependancyTypePage/DependancyTypePage";
import  ReturnTypePage from "./Pages/ReturnTypePage/ReturnTypePage";
import GemyAndZeinab from './Pages/GemyAndZeinab/GemyAndZeinab';
import CompTypePage from './Pages/CompTypePage/CompTypePage';
import TreeComp from './Components/TreeTable/TreeTable';
import TreeTablepage from './Pages/TreeTablePage/TreeTablePage';
import DependanciesParmtersPage from './Pages/DependanciesParmters/DependanciesParmtersPage';
import CompDepReturn from './Pages/CompDepReturn/CompDepReturn';
import BasicTreeData from './Components/EditableTreeTable/EditableTreeTable'
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div >
          <Switch>
          <Route exact  path='/gemyandzeze' component={() => <GemyAndZeinab/>} />
            <Route  path='/components' component={() =><ComponentPage/>} />
            <Route  path='/screens' component={() => <Screens/>} />
            <Route  path='/login' component={() => <LoginStepOnePage/>} />
            <Route  path='/loginpass' component={() => <LoginStepTwoPage/>} />
            <Route exact path='/CRUDGrid' Component={()=><CRUDGrid/>}/>
            <Route exact path='/' component={() => <HomePage />} />
            <Route exact path='/ProjectsPage' component={() =><ProjectsPage/>} />
            <Route exact path='/module' component={() => <ModulePage/> }/>
            <Route exact path='/CRUDTYPES' component={() => <CRUDTYPES/> }/>
            <Route exact path='/DependancyTypePage' component={() => <DependancyTypePage/> }/>
            <Route exact path='/ReturnTypePage' component={() => <ReturnTypePage/> }/>
            <Route exact path='/Projects' component={() => <Project/> }/>
            <Route exact path='/CompTypePage' component={() => <CompTypePage/> }/>
            <Route exact path='/TreeComp' component={() => <TreeComp/> }/>
            <Route exact path='/dependanciesparmterspage' component={() => <DependanciesParmtersPage/> }/>
            <Route exact path='/CompDepReturn' component={() => <CompDepReturn/> }/>
            <Route exact path='/TreeTablepage' component={() => <TreeTablepage/> }/>
            <Route exact path='/BasicTreeData' component={() => <BasicTreeData/> }/>

          </Switch>
        </div>
    );
  }
}

export default withRouter(App);
