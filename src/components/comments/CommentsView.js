import React, { Component } from 'react';
import { Table } from 'reactstrap';
import Milestone from '../milestones/Milestone';
import { Link } from 'react-router-dom'

class CommentsView extends Component {
  state = {comments: [], issue: []}

  componentDidMount() {
    fetch(`/comments/${this.props.match.params.issue_id}`,
    {
      headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
    })
      .then(res => res.json())
      .then(comments => this.setState({ comments }));

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
      <h2>Comments for issue: {this.state.issue.issue_url}</h2>

      <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Author id</th>
              <th>Working</th>
              <th>Description</th>
              <th>Created at</th>
            </tr>
          </thead>
          <tbody>
          {this.state.comments.map(comment =>
            <tr>
              <td>{comment.id}</td>
              <td>{comment.author_id}</td>
              <td>{comment.state === false ? 'False' : 'True'}</td>
              <td>{comment.description}</td>
              <td>{comment.created_at}</td>
            </tr>
          )}
          </tbody>
        </Table>
      </div>
    )
  };
};

export default CommentsView;