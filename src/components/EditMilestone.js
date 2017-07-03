import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Jumbotron } from 'reactstrap';

export default class EditMilestone extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
        milestone: []
      }
      this.sendForm = this.sendForm.bind(this);
   };

  componentDidMount() {
    fetch(`/milestones/${this.props.match.params.milestone_id}/edit`, {
          headers: { 'Accept': 'application/json',
                    'Content-Type': 'application/json',
          }})
      .then(res => res.json())
      .then(milestone => this.setState({ milestone }));
  }

   sendForm(e) {
    fetch(`/milestones/${this.state.milestone.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        description: document.getElementById('description').value || this.state.milestone.description,
        name: document.getElementById('name').value || this.state.milestone.name
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
      <h2>Edit Milestone {this.state.milestone.name}</h2>
      <Form>
        <FormGroup row>
          <Label for="name" sm={2}>Name</Label>
          <Col sm={10}>
            <Input type="name" name="name" id="name" value={this.state.milestone.name}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="description" sm={2}>Description</Label>
          <Col sm={10}>
            <Input type="description" name="description" id="description" placeholder={this.state.milestone.description}/>
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