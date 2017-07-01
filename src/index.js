import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
// import LineChart from 'react-d3-basic';
// import milestones from './data/milestones';

// var LineChart = require('react-d3-basic').LineChart;

// var chartSeries = [
//       {
//         field: 'state',
//         name: 'State',
//         color: '#ff7f0e',
//         style: {
//           "stroke-width": 2,
//           "stroke-opacity": .2,
//           "fill-opacity": .2
//         }
//       }
//     ];

// var x = function(d) {
//   return d.state;
// };


ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<LineChart width= {600} height= {300} data= {milestones} chartSeries= {chartSeries} x= {x}/>, document.getElementById('data_line'));
registerServiceWorker();
