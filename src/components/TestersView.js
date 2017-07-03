import React, { Component } from 'react';
import {
  Jumbotron,
  Table
} from 'reactstrap';

class TestersView extends Component {
  state = {users: [], issue: []}

  componentDidMount() {
    fetch(`/issues/get_testers/${this.props.match.params.issue_id}`, {
      headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
    })
      .then(res => res.json())
      .then(users => this.setState({ users }));

      fetch(`/issues/show/${this.props.match.params.issue_id}`, {
          headers: { 'Accept': 'application/json',
                    'Content-Type': 'application/json',
          }})
      .then(res => res.json())
      .then(issue => this.setState({ issue }));
  }

  render(){

    return(
      <div>
        <Jumbotron>
          <h1> Testers for {this.state.issue.issue_url} </h1>
          <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
          {this.state.users.map(user =>
            <tr>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          )}
          </tbody>
        </Table>
        </Jumbotron>
      </div>
    )
  };
};

export default TestersView;