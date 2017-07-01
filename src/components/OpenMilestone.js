import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

class OpenMilestone extends Component {

  componentDidMount() {
     fetch(`/milestones/${this.props.match.params.id}/open`, {
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

export default OpenMilestone;