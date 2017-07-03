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

class ViewIssue extends Component {
  state = {issue: []}

  componentDidMount() {
    fetch(`/issues/show/${this.props.match.params.id}`,
    {
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(issue => this.setState({ issue }));
  }

  render(){
    const issue = this.state.issue;

    return(
      <div>
      <h2>issue {this.state.issue.issue_url}</h2>
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
              <td>{issue.state}</td>
              <td><Link to={`/add_testers/${issue.milestone_id}/${issue.id}`} component={AddTesters}>add testers</Link></td>
              <td><Link to={`/add_comments/${issue.milestone_id}/${issue.id}`} component={AddComments}>add comments</Link></td>
            </tr>
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

export default ViewIssue;