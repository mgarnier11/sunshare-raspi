import React from 'react';
import { useDrag } from 'react-dnd';
import { DND_MODULE } from '../../../dragAndDrop/constants';

const DndModule = ({ children }) => {
  const [{ opacity }, dragRef] = useDrag({
    item: { type: DND_MODULE, module },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });
  return (
    <div ref={dragRef} style={{ opacity }}>
      {children}
    </div>
  );
};

export default DndModule;
