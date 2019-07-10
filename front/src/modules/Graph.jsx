import React from 'react';
import { VictoryChart, VictoryBar, VictoryAxis } from 'victory';
import apiHandler from '../api/handler';

const componentName = 'Graph';
const size = { x: 5, y: 6 };
const Graph = ({ text }) => (
  <div className="w-100 h-100" style={{ backgroundColor: 'white' }}>
    <VictoryChart domainPadding={{ x: 40 }}>
      <VictoryBar
        data={[
          { experiment: 'day 1', produced: 4, consummed: 3.21 },
          { experiment: 'day 2', produced: 3.28, consummed: 3.38 },
          { experiment: 'day 3', produced: 2.56, consummed: 3.25 },
          { experiment: 'day 4', produced: 4.24, consummed: 3.71 }
        ]}
        x="experiment"
        y={d => d.produced - d.consummed}
      />
      <VictoryAxis label="" />
      <VictoryAxis
        dependentAxis
        label="sold"
        style={{
          axisLabel: { padding: 1 }
        }}
      />
    </VictoryChart>
  </div>
);

const MyModule = {
  componentName,
  component: Graph,
  size
};

export default MyModule;
