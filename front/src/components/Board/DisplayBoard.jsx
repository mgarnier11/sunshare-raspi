import React, { Component } from 'react';
import { connect } from 'react-redux';

import { BoardModule } from './BoardModule';

const mapStateToProps = state => {
  return {
    board: state.board
  };
};

class AdminBoard extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {
    const { board } = this.props;

    return (
      <div className="display-board-container">
        <div
          className="board"
          style={{
            gridTemplateColumns: 'repeat(' + board.width + ', 1fr)',
            gridTemplateRows: 'repeat(' + board.height + ', 1fr)'
          }}
        >
          {board.modules.map(m => {
            return (
              <BoardModule mod={m} moduleProps={{ text: '' }} key={m.id} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(AdminBoard);
