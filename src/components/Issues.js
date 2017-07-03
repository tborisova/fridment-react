import React, { Component } from 'react';
import { Table } from 'reactstrap';
import Milestone from './Milestone';
import { Link } from 'react-router-dom'
import CommentsView from './CommentsView'
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine,
  ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area,
  Label, LabelList } from 'recharts';
import { scalePow, scaleLog } from 'd3-scale';
import { scaleOrdinal, schemeCategory10 } from 'd3-scale';
import AddTesters from './AddTesters'
import AddComments from './AddComments'
import TestersView from './TestersView'
import ViewIssue from './ViewIssue'

class Issues extends Component {
  constructor(props) {
      super(props);
      this.state = {
        issues: [],
        milestone: []
      }
      this.findState = this.findState.bind(this);
   };

  findState(issue) {
    fetch(`/issues/get_state/${issue.id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(function(response) {
      return response.json();
    }).then(function(response){
      document.getElementById(`state_of${issue.id}`).innerHTML = `${JSON.stringify(response).substring(0,4)}%`;
    })
   }

  componentDidMount() {
    fetch(`/issues/${this.props.match.params.milestone_id}`,
    {
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(issues => this.setState({ issues }));

    fetch(`/milestones/${this.props.match.params.milestone_id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(milestone => this.setState({ milestone }));
  }

  render(){
    const id = this.props.match.params.mileston_id;
    return(
      <div>
      <h2>Issues for milestone {this.state.milestone.name}</h2>
      <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Assignee name</th>
              <th>Issue url</th>
              <th>Name</th>
              <th>Description</th>
              <th>Milestone name</th>
              <th>Created at</th>
              <th>Testers IDs</th>
              <th>Comments</th>
              <th>State</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {this.state.issues.map(issue =>
            <tr>
              <td>{issue.id}</td>
              <td>{issue.assignee_name}</td>
              <td>{issue.issue_url}</td>
              <td>{issue.name}</td>
              <td>{issue.description}</td>
              <td><Link to={`/milestones/${this.props.match.params.milestone_id}`} component={Milestone}>{this.props.match.params.milestone_id}</Link></td>
              <td>{issue.created_at}</td>
              {issue.testers.length > 0 ? <td><Link to={`/get_testers/${issue.id}`} component={TestersView}>view testers({issue.testers.length})</Link></td> : <td>No testers</td>}
              {issue.comments.length > 0 ? <td><Link to={`/comments/${issue.id}`} component={CommentsView}>view comments({issue.comments.length})</Link></td> : <td>No comments</td>}
              <td id={`state_of${issue.id}`}>{this.findState(issue)}</td>
              <td><Link to={`/add_testers/${issue.milestone_id}/${issue.id}`} component={AddTesters}>add testers</Link></td>
              <td><Link to={`/add_comments/${issue.milestone_id}/${issue.id}`} component={AddComments}>add comments</Link></td>
            </tr>
          )}
          </tbody>
        </Table>

        <LineChart
            width={600} height={400} data={this.state.issues}
            margin={{ top: 40, right: 40, bottom: 20, left: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="created_at">
            </XAxis>
            <YAxis>
              <Label value="Rate of success" position="insideLeft" angle={90} />
            </YAxis>
            <Tooltip />
            <Line dataKey="state" stroke="#ff7300" dot={false} />
          </LineChart>
      </div>
    )
  };
};

export default Issues;