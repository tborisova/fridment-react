import React, { Component } from 'react';
import { Table } from 'reactstrap';
import MilestoneView from './MilestoneView'
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine,
  ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area,
  Label, LabelList } from 'recharts';
import { scalePow, scaleLog } from 'd3-scale';
// import LineChart from 'react-d3-basic';
import res from '../data/milestones';
import { scaleOrdinal, schemeCategory10 } from 'd3-scale';

class Milestones extends Component {
  state = {milestones: [], users: []}

  componentDidMount() {
    fetch('/milestones', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(milestones => this.setState({ milestones }));
   }

  render(){
    return(
      <div>
      <h2>Milestones</h2>
      <Table responsive hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Author ID</th>
              <th>State</th>
              <th>Created at</th>
              <td colspan="4">Actions</td>
            </tr>
          </thead>
        {this.state.milestones.map(milestone =>
          <MilestoneView milestone={milestone}/>
        )}
        </Table>

           <LineChart
            width={600} height={400} data={this.state.milestones}
            margin={{ top: 40, right: 40, bottom: 20, left: 20 }}>
            <CartesianGrid vertical={true} />
            <XAxis dataKey="created_at">
            </XAxis>
            <YAxis>
              <Label value="State of milestones per creation" position="outsideTop" angle={90} />
            </YAxis>
            <Tooltip />
            <Line dataKey="state" stroke="#ff7300" dot={false} />
          </LineChart>
      </div>
    )
  };
};

export default Milestones;