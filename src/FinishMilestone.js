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
import Issues from './Issues'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

class FinishMilestone extends React.Component {

  componentDidMount() {
     fetch(`/milestones/${this.props.match.params.id}/finish`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
      });
   }

  render(){
     return(
      <Redirect to={{
        pathname: `/milestones/${this.props.match.params.id}`,
      }}/>
    );
  };
};

export default FinishMilestone;