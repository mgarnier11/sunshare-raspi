import React from 'react';
import {Bar} from 'react-chartjs-2';
const data = {
  datasets: [{
    label: 'Consomation',
    type:'line',
    data: [900,1200, 749, 79, 450],
    // fill: false,
    borderColor: '#EC932F',
    backgroundColor: '#EC932F',
    pointBorderColor: '#EC932F',
    pointBackgroundColor: '#EC932F',
    pointHoverBackgroundColor: '#EC932F',
    pointHoverBorderColor: '#EC932F',
    yAxisID: 'y-axis-1'
  },{
    type: 'bar',
    label: 'Production',
    data: [1200, 900, 1500, 621, 900 ],
    // fill: false,
    backgroundColor: '#71B37C',
    borderColor: '#71B37C',
    hoverBackgroundColor: '#71B37C',
    hoverBorderColor: '#71B37C',
    yAxisID: 'y-axis-1'
  }]
};

const options = {
  responsive: true,
  tooltips: {
    mode: 'label'
  },
  elements: {
    line: {
      fill: false
    }
  },
  scales: {

    xAxes: [
      {
        display: true,
        gridLines: {
          display: false
        },

        labels: ['01/07', '02/07', '03/07', '04/07', '05/07', '08/07', '09/07'],
      }
    ],
    yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1',
        gridLines: {
          display: true
        },
        labels: {
          show: true
        }
      },
    ]
  }
};

const plugins = [{
  afterDraw: (chartInstance, easing) => {
    const ctx = chartInstance.chart.ctx;
    ctx.fillText("This text drawn by a plugin", 100, 100);
  }
}];
export default class line extends React.Component {


  render() {
    return (
        // <div>
        //   <h2>Consommation de la semaine</h2>
          <Bar
              data={data}
              options={options}
          />
        // </div>
    );
  }
}