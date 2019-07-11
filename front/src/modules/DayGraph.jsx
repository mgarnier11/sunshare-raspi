import React, { Component } from 'react';
import { VictoryChart, VictoryTheme, VictoryAxis, VictoryLine } from 'victory';
import openSocket from 'socket.io-client';

const componentName = 'DayGraph';
const size = { x: 15, y: 6 };

const timerIntervall = 1 * 1000;

class DayGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeTicks: [],
      prodDataTicks: [],
      consoDataTicks: []
    };

    this.divRef = React.createRef();

    this.socket = openSocket(window.apiUrl + '/datas');
  }

  componentDidMount() {
    this.socket.on('datas/prod/new', newData => {
      let timeTicks = [...this.state.timeTicks];
      let prodDataTicks = [...this.state.prodDataTicks];

      timeTicks.pop();

      timeTicks.unshift(new Date(newData.date));

      prodDataTicks.pop();

      prodDataTicks.unshift(newData.value);

      this.setState({ timeTicks, prodDataTicks });
    });

    this.socket.emit('datas/prod/getAll', allDatas => {
      let timeTicks = allDatas.map(data => new Date(data.date));
      let prodDataTicks = allDatas.map(data => data.value);
      this.setState({ timeTicks, prodDataTicks });
    });
  }

  componentWillUnmount() {}
  render() {
    const { timeTicks, prodDataTicks } = this.state;

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
            tickValues={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
            tickFormat={timeTicks
              .slice()
              .reverse()
              .filter((date, i) => {
                if (i % parseInt(timeTicks.length / 11) === 0) return true;
                return false;
              })
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
            domain={[0, 11]}
            // tickFormat specifies how ticks should be displayed
            tickFormat={x => `${x * 10}%`}
          />

          <VictoryLine
            style={{
              data: { stroke: '#c43a31' },
              parent: { border: '1px solid #ccc' }
            }}
            interpolation="natural"
            data={prodDataTicks
              .filter((data, i) => {
                if (i % parseInt(prodDataTicks.length / 11) === 0) return true;
                return false;
              })
              .slice()
              .reverse()
              .map((tick, i) => {
                console.log(tick);
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
