import React, { Component } from 'react';
import { VictoryChart, VictoryTheme, VictoryAxis, VictoryLine } from 'victory';

const componentName = 'DayGraph';
const size = { x: 15, y: 6 };

const timerIntervall = 1 * 1000;

function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class DayGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeTicks: [],
      dataTicks: []
    };

    this.divRef = React.createRef();

    this.timer = undefined;

    this.updateTicks = this.updateTicks.bind(this);
  }

  updateTicks() {
    let timeTicks = [...this.state.timeTicks];

    timeTicks.pop();

    timeTicks.unshift(new Date());

    let dataTicks = [...this.state.dataTicks];

    dataTicks.pop();

    dataTicks.unshift(this.nextDataTick(dataTicks[0]));

    this.setState({ timeTicks, dataTicks });
  }

  getTimeTicks() {
    let ticks = [];

    let d = new Date();
    ticks.unshift(d);

    while (ticks.length < 11) {
      d = new Date(Date.parse(d) - timerIntervall);
      ticks.unshift(d);
    }

    return ticks.reverse();
  }

  getDataTicks() {
    let ticks = [10];

    while (ticks.length < 11) {
      ticks.unshift(this.nextDataTick(ticks[0]));
    }

    return ticks.reverse();
  }

  nextDataTick(lastTick) {
    let ud = rnd(0, 1);

    let nextTick = ud === 0 ? lastTick + rnd(0, 5) : lastTick - rnd(0, 5);
    if (nextTick < 0) nextTick = 0;
    return nextTick;
  }

  componentDidMount() {
    this.timer = setInterval(this.updateTicks, timerIntervall);
    this.setState({
      timeTicks: this.getTimeTicks(),
      dataTicks: this.getDataTicks()
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const { timeTicks, dataTicks } = this.state;

    return (
      <div
        className="w-100 h-100"
        style={{ backgroundColor: 'white' }}
        ref={this.divRef}
      >
        <VictoryChart
          theme={VictoryTheme.material}
          width={this.divRef.current ? this.divRef.current.offsetWidth : 400}
        >
          <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            tickValues={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            tickFormat={timeTicks
              .slice()
              .reverse()
              .map(
                date =>
                  `${date
                    .getHours()
                    .toString()
                    .padStart(2, '0')}:${date
                    .getMinutes()
                    .toString()
                    .padStart(2, '0')}:${date
                    .getSeconds()
                    .toString()
                    .padStart(2, '0')}`
              )}
          />
          <VictoryAxis
            dependentAxis
            domain={[0]}
            // tickFormat specifies how ticks should be displayed
            tickFormat={x => `${x}W`}
          />
          <VictoryLine
            style={{
              data: { stroke: '#c43a31' },
              parent: { border: '1px solid #ccc' }
            }}
            interpolation="natural"
            data={dataTicks
              .slice()
              .reverse()
              .map((tick, i) => {
                return { x: i, y: tick };
              })}
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
