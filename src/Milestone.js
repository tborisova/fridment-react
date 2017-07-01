import React, { Component } from 'react';
import {
  Jumbotron,
  Table
} from 'reactstrap';
import MilestoneView from './MilestoneView'

class Milestone extends Component {
  state = {milestone: []}

  componentDidMount() {
    fetch(`/milestones/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(milestone => this.setState({ milestone }));
  }

  render(){

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
          <MilestoneView milestone={this.state.milestone}/>
        </Table>
        </Jumbotron>
      </div>
    )
  };
};

export default Milestone;