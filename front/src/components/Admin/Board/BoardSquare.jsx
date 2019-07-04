import React from 'react';
import { useDrop } from 'react-dnd';
import { DND_MODULE } from '../../../dragAndDrop/constants';

function test() {
  console.log('test');
}

export const BoardSquare = ({ children }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: DND_MODULE,
    drop: () => test(),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  });
  return <div ref={drop} style={{ height: '100px', width: '100px' }} />;
};
