import React, { Component } from 'react';
import { VictoryChart, VictoryAxis, VictoryLine } from 'victory';

const componentName = 'DayGraph';
const size = { x: 5, y: 6 };

class DayGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeTicks: this.getTimeTicks(),
      dataTicks: []
    };

    this.timer = undefined;

    this.updateTicks = this.updateTicks.bind(this);
  }

  updateTicks() {
    this.setState({ timeTicks: this.getTimeTicks() });
    //pop first value and add actual date every 5 min
  }

  getTimeTicks() {
    let ticks = [];

    let d = new Date();
    ticks.push(d);

    while (ticks.length < 288) {
      d = new Date(Date.parse(d) - 5 * 60 * 1000);
      ticks.push(d);
    }

    return ticks;
  }

  componentDidMount() {
    this.timer = setInterval(this.updateTicks, 5 * 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    return (
      <div className="w-100 h-100" style={{ backgroundColor: 'white' }}>
        <VictoryChart>
          <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            tickValues={[]}
            tickFormat={['test', 'Quarter 2', 'Quarter 3', '']}
          />
          <VictoryAxis
            dependentAxis
            domain={[0, 25]}
            // tickFormat specifies how ticks should be displayed
            tickFormat={x => `${x}W`}
          />
          <VictoryLine
            style={{
              data: { stroke: '#c43a31' },
              parent: { border: '1px solid #ccc' }
            }}
            interpolation="natural"
            data={[
              { x: 0, y: 8 },
              { x: 1, y: 2 },
              { x: 2, y: 3 },
              { x: 3, y: 5 },
              { x: 4, y: 4 },
              { x: 5, y: 7 }
            ]}
          />
        </VictoryChart>
      </div>
    );
  }
}

const MyModule = {
  componentName,
  component: DayGraph,
  size
};

export default MyModule;
