import React, { Component } from 'react';
import { connect } from 'react-redux';

import BoardSquare from './BoardSquare';
import { addModule } from '../../redux/actions/board-actions';

import modules from '../../modules/index';
import ModuleLoader from '../old/ModuleLoader';
import BoardModule from './BoardModule';

const mapStateToProps = state => {
  return {
    board: state.board
  };
};

function mapDispatchToProps(dispatch) {
  return { addModule: m => dispatch(addModule(m)) };
}

class Board extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="board-container">
        <div
          className="board"
          style={{
            gridTemplateColumns: 'repeat(' + this.props.board.width + ', 1fr)',
            gridTemplateRows: 'repeat(' + this.props.board.height + ', 1fr)'
          }}
        >
          {this.props.admin ? this.renderAdmin() : this.renderDisplay()}
        </div>
      </div>
    );
  }

  renderAdmin() {
    return (
      <>
        {[...Array(this.props.board.height)].map((valueX, x) => {
          return [...Array(this.props.board.width)].map((valueY, y) => {
            return <BoardSquare x={x} y={y} key={(x + 1) * (y + 1)} />;
          });
        })}
        {this.props.board.modules.map(m => {
          return <BoardModule mod={m} moduleProps={{ text: '' }} key={m.id} />;
        })}
      </>
    );
  }

  renderDisplay() {
    return <></>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
