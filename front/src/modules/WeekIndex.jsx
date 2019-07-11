import React from 'react';
import datas from './datas.json';

const componentName = 'WeekIndex';
const size = { x: 4, y: 2 };
const reducer = (accumulator, currentValue) =>
  (isNaN(accumulator) ? 0 : accumulator) + currentValue;

const weekind = datas.map(data => parseInt(data.CONSOCALC)).reduce(reducer);

const WeekIndex = () => (
  <div className="w-100 h-100">
    <h2 className="text-center">Index de la semaine</h2>
    <h1 className="text-center">{parseInt(weekind / 1000)} kW</h1>
  </div>
);

const Module = {
  componentName,
  component: WeekIndex,
  size
};

export default Module;
