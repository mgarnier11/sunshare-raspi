import React from 'react';

const componentName = 'BlueSquare';
const size = { x: 1, y: 1 };
const BlueSquare = ({ text }) => (
  <div className="w-100 h-100" style={{ backgroundColor: 'blue' }}>
    {text}
  </div>
);

const MyModule = {
  componentName,
  component: BlueSquare,
  size
};

export default MyModule;
