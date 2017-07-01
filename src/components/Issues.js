import React, { Component } from 'react';
import { Table } from 'reactstrap';
import Milestone from './Milestone';
import { Link } from 'react-router-dom'

class Issues extends Component {
  state = {issues: []}

  componentDidMount() {
    fetch(`/milestones/${this.props.match.params.mileston_id}/issues`)
      .then(res => res.json())
      .then(issues => this.setState({ issues }));
  }

  render(){
    const id = this.props.match.params.mileston_id;
    const filtered_issues = this.state.issues.filter((issue) => issue.milestone_id == id);

    return(
      <div>
      <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Assignee name</th>
              <th>Issue url</th>
              <th>Name</th>
              <th>Description</th>
              <th>Milestone id</th>
              <th>Created at</th>
              <th colspan="2">Actions</th>
              <th>Testers</th>
              <th>Comments</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
          {filtered_issues.map(issue =>
            <tr>
              <td>{issue.id}</td>
              <td>{issue.assignee_name}</td>
              <td>{issue.issue_url}</td>
              <td>{issue.name}</td>
              <td>{issue.description}</td>
              <td><Link to={`/milestones/${id}`} component={Milestone}>{issue.milestone_id}</Link></td>
              <td>{issue.created_at}</td>
              <td>Add Testers</td>
              <td>testers</td>
              <td>comments</td>
              <td>state</td>
            </tr>
          )}
          </tbody>
        </Table>
      </div>
    )
  };
};

export default Issues;