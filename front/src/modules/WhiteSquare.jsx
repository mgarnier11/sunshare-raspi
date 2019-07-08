import React from 'react';
import { useDrag } from 'react-dnd';
import { DND_MODULE } from '../dragAndDrop/constants';

const componentName = 'WhiteSquare';
const size = { x: 1, y: 1 };
const WhiteSquare = ({ text, position = { x: 0, y: 0 }, id = 0 }) => {
  const [{ opacity }, dragRef] = useDrag({
    item: { type: DND_MODULE, id },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.7 : 1
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
      {text}
    </div>
  );
};

const MyModule = {
  componentName,
  component: WhiteSquare,
  size
};

export default MyModule;
