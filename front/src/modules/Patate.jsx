import React from 'react';

const size = { x: 3, y: 2 };
const Patate = ({ position = { x: 0, y: 0 } }) => (
  <div
    style={{
      gridRowStart: position.x + 1,
      gridRowEnd: position.x + 1 + size.x,
      gridColumnStart: position.y + 1,
      gridColumnEnd: position.y + 1 + size.y,
      backgroundColor: 'red'
    }}
  >
    Test
  </div>
);

const MyModule = {
  componentName: 'Patate',
  component: Patate,
  size
};

export default MyModule;
