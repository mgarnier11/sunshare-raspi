import React from 'react';
import {Doughnut } from 'react-chartjs-2';
import {PieChart, Pie, Sector, Cell} from 'recharts';
const data01 = [
    { name: 'Consommation', value: 400 }, { name: 'Group B', value: 300 },
];
const data02 = [
    { name: 'A1', value: 100 },
    { name: 'A2', value: 300 },
];

const data = {
    labels: ['Consommation', 'Production', 'Autres'],
    datasets: [
        {
            label: 'Rendement',
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: [2500, 5000, 100]
        }
    ]
};
export default class circle extends React.Component {


  render() {
    return (
          <Doughnut class='circle-line'  data={data} />
    );
  }
}