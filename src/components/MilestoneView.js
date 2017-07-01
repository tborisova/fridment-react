import React, { Component } from 'react';
import Issues from './Issues'
import GenerateIssues from './GenerateIssues'
import OpenMilestone from './OpenMilestone'

import { Link } from 'react-router-dom'

import FinishMilestone from './FinishMilestone'

class MilestoneView extends Component {


  render(){
    const milestone = this.props.milestone;
    return(
          <tbody>
            <tr>
              <th>{milestone.id}</th>
              <td>{milestone.name}</td>
              <td>{milestone.description}</td>
              <td>{milestone.author_id}</td>
              <td>{milestone.state}</td>
              <td>{milestone.created_at}</td>
              {milestone.state === 1 ? <td><Link to={`/milestones/${milestone.id}/issues/create`} component={GenerateIssues}>Generate issues</Link></td> : <td>This milestone is closed</td>}              
              <td><Link to={`/issues/${milestone.id}`} component={Issues}>Issues</Link></td>
              <td>edit</td>
              {milestone.state === 1 ? <td><Link to={`/milestones/${milestone.id}/finish`} component={FinishMilestone}>Finish</Link></td> : <td><Link to={`/milestones/${milestone.id}/open`} component={OpenMilestone}>Open Milestone</Link></td>}              
            </tr>
          </tbody>
    )
  };
};

export default MilestoneView;