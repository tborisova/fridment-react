import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import Milestones from './Milestones';
import Issues from './Issues';
import Milestone from './Milestone';
import GenerateIssues from './GenerateIssues'
import FinishMilestone from './FinishMilestone'
import OpenMilestone from './OpenMilestone'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import CommentsView from './CommentsView'

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
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/components/">user</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://github.com/reactstrap/reactstrap">Logout</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <Route exact path="/milestones" component={Milestones}/>
          <Route exact path="/issues/:mileston_id" component={Issues}/>
          <Route exact path="/milestones/:id/issues/create" component={GenerateIssues}/>
          <Route exact path="/milestones/:id" component={Milestone}/>
          <Route exact path="/milestones/:id/finish" component={FinishMilestone}/>
          <Route exact path="/milestones/:id/open" component={OpenMilestone}/>
          <Route exact path="/milestones/:id/open" component={OpenMilestone}/>
          <Route exact path="milestones/:id/issues/:issue_id/comments" component={CommentsView}/>
        </div>
      </Router>
    );
  }
}

export default Header;
