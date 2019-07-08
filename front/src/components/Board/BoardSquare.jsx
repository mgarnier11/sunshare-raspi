import React from 'react';
import { useDrop } from 'react-dnd';
import { DND_MODULE } from '../../dragAndDrop/constants';
import { connect } from 'react-redux';

import { moveModule } from '../../redux/actions/board-actions';

const mapStateToProps = state => {
  return {
    board: state.board
  };
};

function mapDispatchToProps(dispatch) {
  return {
    moveModule: (id, nextPosition) => dispatch(moveModule(id, nextPosition))
  };
}

function canMoveModule(mod, nextPosition, size) {
  if (nextPosition.x + mod.size.x > size.width) return false;
  if (nextPosition.y + mod.size.y > size.height) return false;
  return true;
}

const BoardSquare = ({ board, moveModule, x, y }) => {
  const [{ isOver }, drop] = useDrop({
    accept: DND_MODULE,
    drop: item => {
      moveModule(item.id, { x, y });
    },
    canDrop: item => {
      const mod = board.modules.find(m => m.id === item.id);
      if (mod)
        return canMoveModule(
          mod,
          { x, y },
          { height: board.height, width: board.width }
        );
      return true;
    },
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });
  return (
    <div
      ref={drop}
      style={{
        gridRowStart: y + 1,
        gridRowEnd: y + 2,
        gridColumnStart: x + 1,
        gridColumnEnd: x + 2,
        border: '1px solid red',
        backgroundColor: isOver ? '#CCC' : ''
      }}
    />
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardSquare);
