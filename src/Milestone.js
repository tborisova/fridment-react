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
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import GenerateIssues from './GenerateIssues'
import FinishMilestone from './FinishMilestone'
import OpenMilestone from './OpenMilestone'
import MilestoneView from './MilestoneView'

class Milestone extends React.Component {
  state = {milestone: []}

  componentDidMount() {
    fetch(`/milestones/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(milestone => this.setState({ milestone }));
  }

  render(){

    const id = this.props.match.params.id;
    const milestone = this.state.milestone;

    return(
      <div>
        <Jumbotron>
          <h1>Milestone {}</h1>
          <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Author</th>
              <th>State</th>
              <th>Created at</th>
              <th colspan="4">Actions</th>
            </tr>
          </thead>
          <MilestoneView milestone={milestone}/>
        </Table>
        </Jumbotron>
      </div>
    )
  };
};

export default Milestone;