import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Jumbotron,
  Button,
  Table
} from 'reactstrap';
import milestones from './data/milestones'
import Issues from './Issues'
import GenerateIssues from './GenerateIssues'
import OpenMilestone from './OpenMilestone'
import MilestoneView from './MilestoneView'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import FinishMilestone from './FinishMilestone'

class Milestones extends React.Component {
  state = {milestones: []}

  componentDidMount() {
    fetch('/milestones')
      .then(res => res.json())
      .then(milestones => this.setState({ milestones }));
   }

  render(){
    return(
      <div>
      <Table responsive hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Author</th>
              <th>State</th>
              <th>Created at</th>
              <td colspan="4">Actions</td>
            </tr>
          </thead>
        {this.state.milestones.map(milestone =>
          <MilestoneView milestone={milestone}/>
        )}
        </Table>
      </div>
    )
  };
};

export default Milestones;