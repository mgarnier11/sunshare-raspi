import React from 'react';

const componentName = 'BigSquare';
const size = { x: 3, y: 3 };
const BigSquare = ({ text }) => (
  <div className="w-100 h-100" style={{ backgroundColor: 'green' }}>
    {text}
  </div>
);

const MyModule = {
  componentName,
  component: BigSquare,
  size
};

export default MyModule;
