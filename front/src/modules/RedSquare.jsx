import React from 'react';

const componentName = 'RedSquare';
const size = { x: 1, y: 1 };
const RedSquare = ({ text }) => (
  <div className="w-100 h-100" style={{ backgroundColor: 'red' }}>
    {text}
  </div>
);

const MyModule = {
  componentName,
  component: RedSquare,
  size
};

export default MyModule;
