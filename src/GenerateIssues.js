import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
class GenerateIssues extends Component {

  componentDidMount() {
     fetch(`/milestones/${this.props.match.params.id}/issues`, {
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

export default GenerateIssues;