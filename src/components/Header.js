import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavButton
} from 'reactstrap';

import Milestones from './Milestones';
import Issues from './Issues';
import Milestone from './Milestone';
import GenerateIssues from './GenerateIssues'
import FinishMilestone from './FinishMilestone'
import OpenMilestone from './OpenMilestone'
import NewMilestone from './NewMilestone'
import EditMilestone from './EditMilestone'
import Callback from './Callback'
import AuthService from './AuthService'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import CommentsView from './CommentsView'
import AddTesters from './AddTesters'
import AddComments from './AddComments'
import TestersView from './TestersView'
import ViewIssue from './ViewIssue'
import { login, logout, isLoggedIn } from './AuthService';

  const auth = new AuthService();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}
class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {

    return (
      <Router>
        <div>
          <Navbar color="faded" light toggleable>
            <NavbarToggler right onClick={this.toggle} />
            <NavbarBrand><Link to="/milestones">Milestones</Link></NavbarBrand>
            {
             ( auth.isAuthenticated() ) ? <NavbarBrand><Link to="/new_milestone">New milestone</Link></NavbarBrand> :  ''
            }

            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
              <NavItem>
                {
                (auth.isAuthenticated()) ? ( <button className="btn btn-danger log" onClick={() => auth.logout()}>Log out </button> ) : ( <button className="btn btn-info log" onClick={() => auth.login()}>Log In</button> )
                }
              </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <Route exact path="/milestones" component={Milestones}/>
          <Route exact path="/new_milestone" component={NewMilestone}/>
          <Route exact path="/milestones/:milestone_id/edit" component={EditMilestone}/>
          <Route exact path="/issues/:milestone_id" component={Issues}/>
          <Route exact path="/generate_issues/:milestone_name" component={GenerateIssues}/>
          <Route exact path="/milestones/:milestone_id" component={Milestone}/>
          <Route exact path="/finish_milestone/:milestone_id" component={FinishMilestone}/>
          <Route exact path="/open_milestone/:milestone_id" component={OpenMilestone}/>
          <Route exact path="/milestones/:id/open" component={OpenMilestone}/>
          <Route exact path="/comments/:issue_id" component={CommentsView}/>
          <Route exact path="/add_testers/:milestone_id/:issue_id" component={AddTesters}/>
          <Route exact path="/add_comments/:milestone_id/:issue_id" component={AddComments}/>
          <Route exact path="/get_testers/:issue_id" component={TestersView}/>
          <Route exact path="/issues/show/:id" component={ViewIssue}/>
          <Route path="/callback" component={Callback} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>
        </div>
      </Router>
    );
  }
}

export default Header;
