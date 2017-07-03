import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Jumbotron } from 'reactstrap';

export default class AddComments extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
        users: [],
        issue: []
      }
      this.sendForm = this.sendForm.bind(this);
   };

   sendForm(e) {
    fetch(`/comments/${this.props.match.params.milestone_id}/${this.props.match.params.issue_id}`, {
      method: 'POST',
      body: JSON.stringify({
        state: document.getElementById('state').value,
        description: document.getElementById('description').value
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(window.location = `/issues/${this.props.match.params.issue_id}`)
   }

  componentDidMount() {
    fetch(`/issues/show/${this.props.match.params.issue_id}`, {
          headers: { 'Accept': 'application/json',
                    'Content-Type': 'application/json',
          }})
      .then(res => res.json())
      .then(issue => this.setState({ issue }));
  }
  render() {
    return (
      <Jumbotron>
      <h2>Add comment for issue {this.state.issue.issue_url}</h2>
      <Form>
        <FormGroup>
          <Label for="state">State</Label>
          <Input type="select" name="state" id="state">
            <option>true</option>
            <option>false</option>
          </Input>
        </FormGroup>
         <FormGroup>
          <Label for="description">Description</Label>
          <Input type="textarea" name="description" id="description" />
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