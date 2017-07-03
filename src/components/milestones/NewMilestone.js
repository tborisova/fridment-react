import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Jumbotron } from 'reactstrap';

export default class NewMilestone extends React.Component {
  constructor(props) {
      super(props);
      this.sendForm = this.sendForm.bind(this);
   };

   sendForm(e) {
    fetch('/milestones', {
      method: 'POST',
      body: JSON.stringify({
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        author_id: document.getElementById('author').value,
        state: 'opened'
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(window.location = '/milestones')
   }

  render() {
    return (
      <Jumbotron>
      <h2>New milestone</h2>
      <Form>
        <FormGroup row>
          <Label for="name" sm={2}>Name</Label>
          <Col sm={10}>
            <Input type="name" name="name" id="name" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="description" sm={2}>Description</Label>
          <Col sm={10}>
            <Input type="description" name="description" id="description" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="author" sm={2}>Author</Label>
          <Col sm={10}>
            <Input type="author" name="author" id="author"  />
          </Col>
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