import React, { Component } from 'react';
import { connect } from 'react-redux';

import BoardSquare from './BoardSquare';
import { addModule } from '../../redux/actions/board-actions';

import DndBoardModule from './BoardModule';

const mapStateToProps = state => {
  return {
    board: state.board
  };
};

function mapDispatchToProps(dispatch) {
  return { addModule: m => dispatch(addModule(m)) };
}

class AdminBoard extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {
    const { board } = this.props;

    return (
      <div className="admin-board-container">
        <div
          className="board"
          style={{
            gridTemplateColumns: 'repeat(' + board.width + ', 1fr)',
            gridTemplateRows: 'repeat(' + board.height + ', 1fr)'
          }}
        >
          {[...Array(board.height)].map((valueX, x) => {
            return [...Array(board.width)].map((valueY, y) => {
              return <BoardSquare x={x} y={y} key={(x + 1) * (y + 1)} />;
            });
          })}
          {board.modules.map(m => {
            return (
              <DndBoardModule
                drag={true}
                mod={m}
                moduleProps={{ text: '' }}
                key={m.id}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminBoard);
