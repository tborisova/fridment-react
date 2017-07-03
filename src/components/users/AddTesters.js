import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Jumbotron } from 'reactstrap';

export default class AddTesters extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
        users: [],
        issue: []
      }
      this.sendForm = this.sendForm.bind(this);
   };

  componentDidMount() {
    fetch(`/users`, {
          headers: { 'Accept': 'application/json',
                    'Content-Type': 'application/json',
          }})
      .then(res => res.json())
      .then(users => this.setState({ users }));

      fetch(`/issues/show/${this.props.match.params.issue_id}`, {
          headers: { 'Accept': 'application/json',
                    'Content-Type': 'application/json',
          }})
      .then(res => res.json())
      .then(issue => this.setState({ issue }));
  }

   sendForm(e) {
    fetch(`/issues/add_testers/${this.props.match.params.milestone_id}/${this.props.match.params.issue_id}`, {
      method: 'POST',
      body: JSON.stringify({
        user_id: document.getElementById('users').options[document.getElementById('users').selectedIndex].value
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(window.location = `/issues/${this.props.match.params.milestone_id}`)
   }

  render() {
    return (
      <Jumbotron>
      <h2>Add testers for issue {this.state.issue.issue_url}</h2>
      <Form>
        <FormGroup>
          <Label for="users">Select Multiple</Label>
          <Input type="select" name="users" id="users">
            {this.state.users.map(user =>
              <option value={user.id}>{user.name}</option>
            )}
          </Input>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button onClick={this.sendForm}>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
      </Jumbotron>
    );
  }
}