import React, { Component } from 'react';
import Issues from '../issues/Issues'
import GenerateIssues from '../issues/GenerateIssues'
import OpenMilestone from '../milestones/OpenMilestone'

import { Link } from 'react-router-dom'

import FinishMilestone from '../milestones/FinishMilestone'

class MilestoneView extends Component {


  render(){
    const milestone = this.props.milestone;
    return(
          <tbody>
            <tr>
              <td><Link to={`/milestones/${milestone.id}`}>{milestone.id}</Link></td>
              <td>{milestone.name}</td>
              <td>{milestone.description}</td>
              <td>{milestone.author_id}</td>
              <td>{milestone.state === 1 ? 'opened' : 'closed'}</td>
              <td>{milestone.created_at}</td>
              {milestone.state === 1 ? <td><Link to={`/generate_issues/${milestone.name}`} component={GenerateIssues}>Generate issues</Link></td> : <td>This milestone is closed</td>}              
              <td><Link to={`/issues/${milestone.id}`} component={Issues}>Issues</Link></td>
              <td><Link to={`/milestones/${milestone.id}/edit`}>Edit</Link></td>
              {milestone.state === 1 ? <td><Link to={`/finish_milestone/${milestone.id}`} component={FinishMilestone}>Finish</Link></td> : <td><Link to={`/open_milestone/${milestone.id}`} component={OpenMilestone}>Open Milestone</Link></td>}              
            </tr>
          </tbody>
    )
  };
};

export default MilestoneView;