import React from 'react';
import { isMobile } from 'react-device-detect';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd';

import Actions from './Actions/Actions';
import Board from '../Board/Board';

const Admin = () => (
  <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
    <Actions />

    <Board />
  </DndProvider>
);

export default Admin;
