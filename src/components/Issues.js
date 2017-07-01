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

class Issues extends Component {
  state = {issues: []}

  componentDidMount() {
    fetch(`/milestones/${this.props.match.params.mileston_id}/issues`,
    {
      headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
    })
      .then(res => res.json())
      .then(issues => this.setState({ issues }));
  }

  render(){
    const id = this.props.match.params.mileston_id;

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
              <th>Testers</th>
              <th>Comments</th>
              <th>State</th>
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
              <td><Link to={`/milestones/${id}`} component={Milestone}>{issue.milestone_id}</Link></td>
              <td>{issue.created_at}</td>
              <td>{issue.testers}</td>
              {issue.number_of_comments > 0 ? <td><Link to={`milestones/${id}/issues/${issue.id}/comments`} component={CommentsView}>view comments</Link></td> : <td>No comments</td>}
              <td>{issue.state}</td>
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