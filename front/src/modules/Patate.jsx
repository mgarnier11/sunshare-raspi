import React from 'react';
import { useDrag } from 'react-dnd';
import { DND_MODULE } from '../dragAndDrop/constants';
import Radar from "./radar/radar";

const componentName = 'Patate';
const size = { x: 5, y: 5 };
const Patate = ({ position = { x: 0, y: 0 }, id = 0 }) => {
  const [{ opacity }, dragRef] = useDrag({
    item: { type: DND_MODULE, id },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });
  return (
    <div
      ref={dragRef}
      style={{
        gridRowStart: position.y + 1,
        gridRowEnd: position.y + 1 + size.y,
        gridColumnStart: position.x + 1,
        gridColumnEnd: position.x + 1 + size.x,
        backgroundColor: 'white',
        opacity
      }}
    >
      <Radar />
    </div>

  );
};

const MyModule = {
  componentName,
  component: Patate,
  size
};

export default MyModule;
