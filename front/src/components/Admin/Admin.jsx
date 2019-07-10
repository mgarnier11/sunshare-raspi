import React from 'react';
import { isMobile } from 'react-device-detect';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd';

import Actions from './Actions/Actions';
import AdminBoard from '../Board/AdminBoard';

const Admin = () => (
  <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
    <Actions />

    <AdminBoard admin={true} />
  </DndProvider>
);

export default Admin;
