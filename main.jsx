import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, Link} from 'react-router';
import IssueForm from './jsx/classes/Issue.jsx'
import ReturnBookForm from './jsx/classes/ReturnBook.jsx'
import AddBookForm from './jsx/classes/AddBook.jsx'
import RegisterBorrower from './jsx/classes/Register.jsx'
import HomePage from './jsx/classes/HomePage.jsx'
import SearchBook from './jsx/classes/SearchBook.jsx'
import AdminMenu from './jsx/classes/AdminMenu.jsx'
import StudentMenu from './jsx/classes/StudentMenu.jsx'
import AdvancedSearch from './jsx/classes/AdvancedSearch.jsx'
import Homelog from './jsx/classes/Homelog.jsx'
import StudentLogin from './jsx/classes/StudentLogin.jsx'
import AdminLogin from './jsx/classes/AdminLogin.jsx'
import Admindashboard from './jsx/classes/Admindashboard.jsx'
import Studentdashboard from './jsx/classes/Studentdashboard.jsx'
import { browserHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

ReactDOM.render((
  <div >
    <br/>
    <br/>
    <br/>
      <Router history={browserHistory}>
        <Route name="login"  component={HomePage}>
            <Route name="options" path="/" component={Homelog}/>
            <Route name="StudentLogin" path="/StudentLogin" component={StudentLogin}/>                                                                    
            <Route name="AdminLogin" path="/AdminLogin" component={AdminLogin}/>
        </Route>
      </Router>
  </div>
),
document.getElementById('leftPanel'));
ReactDOM.render((
  <div>
      <Router history={browserHistory}>
        <Route name="admin"  component={Admindashboard}>
            <Route name="issue" path="/issue" component={IssueForm}/>                                                                                  
            <Route name="returnbook" path="/returnbook" component={ReturnBookForm}/>                                                                               
            <Route name="add" path="/add" component={AddBookForm}/>                                                                             
            <Route name="register" path="/register" component={RegisterBorrower}/>                                                     
            <Route name="menu" path="/Admindashboard" component={AdminMenu}/>                                                                                                  
            <Route name="search" path="/search" component={SearchBook}/>                                                                                                             
            <Route name="advancedsearch" path="/advancedsearch" component={AdvancedSearch}/>                                                                
        </Route>  
        <Route name = "student" component = {Studentdashboard}>
          <Route name="menus" path='/dash' component={StudentMenu}/>
        </Route>  
      </Router>
  </div>
),
document.getElementById('rightPanel'));
