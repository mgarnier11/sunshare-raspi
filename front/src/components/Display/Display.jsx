import React from 'react';
import Card from '../../modules/Test';
import DndModule from '../Admin/DnDModule/DnDModule';
import Board from '../Admin/Board/Board';

const Display = () => (
  <div className="display">
    <DndModule>
      <Card text="patate" />
    </DndModule>
    <Board />
  </div>
);

export default Display;
