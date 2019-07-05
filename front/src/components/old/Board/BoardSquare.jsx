import React from 'react';
import { useDrop } from 'react-dnd';
import { DND_MODULE } from '../../../dragAndDrop/constants';
import DndModule from '../DnDModule/DnDModule';
import myModule from '../../../modules/Test';

function test(x, y) {
  console.log(x, y);
}

export const BoardSquare = ({ x, y }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: DND_MODULE,
    drop: (item, monitor) => {
      console.log(item, monitor);
      test(x, y);
    },
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
        backgroundColor: isOver ? 'red' : 'white'
      }}
    >
      <DndModule>
        <myModule.m text="patate" />
      </DndModule>
    </div>
  );
};
