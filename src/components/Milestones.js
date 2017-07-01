import React, { Component } from 'react';
import { Table } from 'reactstrap';
import MilestoneView from './MilestoneView'

class Milestones extends Component {
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