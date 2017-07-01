import React, { Component } from 'react';
import { Table } from 'reactstrap';
import Milestone from './Milestone';
import { Link } from 'react-router-dom'

class CommentsView extends Component {
  state = {comments: []}

  componentDidMount() {
    fetch(`/milestones/${this.props.match.params.id}/comments/${this.props.match.params.comment_id}/comments`,
    {
      headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
    })
      .then(res => res.json())
      .then(comments => this.setState({ comments }));
  }

  render(){

    return(
      <div>
      <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Author name</th>
              <th>comment</th>
              <th>Working</th>
              <th>Description</th>
              <th>Created at</th>
            </tr>
          </thead>
          <tbody>
          {this.state.comments.map(comment =>
            <tr>
              <td>{comment.id}</td>
              <td>{comment.author_name}</td>
              <td>{comment.state}</td>
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