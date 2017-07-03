import React, { Component } from 'react';
import {  Redirect } from 'react-router-dom'

class FinishMilestone extends Component {

  componentDidMount() {
     fetch(`/milestones/finish/${this.props.match.params.milestone_id}`, {
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
        pathname: `/milestones`,
      }}/>
    );
  };
};

export default FinishMilestone;