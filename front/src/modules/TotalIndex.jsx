import React from 'react';

const componentName = 'TotalIndex';
const size = { x: 4, y: 2 };

const TotalIndex = () => (
  <div className="w-100 h-100">
    <h2 className="text-center">Index Total</h2>
    <h1 className="text-center">3562 kW</h1>
  </div>
);

const Module = {
  componentName,
  component: TotalIndex,
  size
};

export default Module;
