import {Route, HashRouter,Switch} from 'react-router-dom';
import React from 'react';
import LoginPage from './pages/login';
import HomePage from './pages/index';
export default ()=>{
  return(
    <div className='app'>
      <HashRouter>
         <Switch>
         <Route path="/" exact component={HomePage}/>
           <Route path="/login" exact component={LoginPage}/>
         </Switch>
      </HashRouter> 
    </div> 
  )
}