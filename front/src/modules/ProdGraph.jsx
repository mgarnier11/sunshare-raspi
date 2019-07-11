import React, { Component } from 'react';
import { VictoryChart, VictoryTheme, VictoryAxis, VictoryLine } from 'victory';

import datas from './datas.json';

const componentName = 'ProdGraph';
const size = { x: 11, y: 5 };

class ProdGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prod: [],
      conso: [],
      days: []
    };

    this.divRef = React.createRef();
  }

  componentDidMount() {
    let days = datas.map(data => data.JOURNEE);
    days = [...new Set(days)];

    this.setState({
      prod: datas.map(data => data.PROD),
      conso: datas.map(data => data.CONSOCALC),
      days
    });
  }

  render() {
    const { prod, conso, days } = this.state;

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
            // tickFormat specifies how ticks should be displayed
            tickFormat={x => ``}
          />
          <VictoryAxis
            dependentAxis
            domain={[0, 11]}
            // tickFormat specifies how ticks should be displayed
            tickFormat={x => `${x}W/h`}
          />
          <VictoryLine
            style={{
              data: { stroke: 'green' }
            }}
            interpolation="natural"
            data={prod.map((tick, i) => {
              return { x: i, y: tick };
            })}
          />

          <VictoryLine
            style={{
              data: { stroke: 'red' }
            }}
            interpolation="natural"
            data={conso.map((tick, i) => {
              return { x: i, y: tick };
            })}
          />
        </VictoryChart>
      </div>
    );
  }
}

const Module = {
  componentName,
  component: ProdGraph,
  size
};

export default Module;
