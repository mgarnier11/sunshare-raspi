import React from 'react';
import { useDrop } from 'react-dnd';
import { DND_MODULE } from '../../../dragAndDrop/constants';

function test(x, y) {
  console.log(x, y);
}

export const BoardSquare = ({ x, y }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: DND_MODULE,
    drop: () => test(x, y),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  });
  return (
    <div
      ref={drop}
      className="board-square"
      style={{
        gridRow: x,
        gridColumn: y,
        backgroundColor: isOver ? 'red' : 'white'
      }}
    />
  );
};
