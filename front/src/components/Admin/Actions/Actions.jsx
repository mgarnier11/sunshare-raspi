import React from 'react';
import { useDrop } from 'react-dnd';
import { connect } from 'react-redux';

import { DND_MODULE } from '../../../dragAndDrop/constants';
import { removeModule } from '../../../redux/actions/board-actions';
import ModuleList from './ModuleList';

function mapDispatchToProps(dispatch) {
  return {
    removeModule: id => dispatch(removeModule(id))
  };
}

const Actions = ({ removeModule }) => {
  const [{ isOver }, drop] = useDrop({
    accept: DND_MODULE,
    drop: item => {
      console.log(item);
      removeModule(item.id);
    },
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });
  return (
    <div className="actions row">
      <div className="modules col-11">
        <ModuleList />
      </div>
      <div
        className="trash col-1 text-center p-2"
        ref={drop}
        style={{ color: isOver ? 'red' : '' }}
      >
        <i class="fas fa-trash-alt" />
      </div>
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Actions);
