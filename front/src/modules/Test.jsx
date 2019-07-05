import React from 'react';

const size = { x: 2, y: 6 };
const Test = ({ position = { x: 0, y: 0 } }) => (
  <div
    style={{
      gridRowStart: position.x + 1,
      gridRowEnd: position.x + 1 + size.x,
      gridColumnStart: position.y + 1,
      gridColumnEnd: position.y + 1 + size.y,
      backgroundColor: 'red'
    }}
  >
    <h1>Test</h1>
  </div>
);

const MyModule = {
  componentName: 'Test',
  component: Test,
  size
};

export default MyModule;
