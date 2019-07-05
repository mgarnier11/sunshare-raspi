import React, { Component } from 'react';
import { connect } from 'react-redux';

import BoardSquare from './BoardSquare';
import { addModule } from '../../redux/actions/board-actions';

import Patate from '../../modules/Patate';
import Test from '../../modules/Test';

const mapStateToProps = state => {
  return {
    boardLayout: state.board.layout
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

    this.props.addModule({
      componentName: Patate.componentName,
      position: { x: 1, y: 2 },
      size: Patate.size
    });

    this.props.addModule({
      componentName: Patate.componentName,
      position: { x: 4, y: 2 },
      size: Patate.size
    });

    this.props.addModule({
      componentName: Patate.componentName,
      position: { x: 7, y: 2 },
      size: Patate.size
    });

    this.props.addModule({
      componentName: Test.componentName,
      position: { x: 2, y: 6 },
      size: Patate.size
    });
  }

  render() {
    return (
      <div
        className="board"
        style={{
          gridTemplateColumns:
            'repeat(' + this.props.boardLayout.length + ', 1fr)',
          gridTemplateRows:
            'repeat(' + this.props.boardLayout[0].length + ', 1fr)'
        }}
      >
        {this.props.boardLayout.map((line, x) => {
          return line.map((accept, y) => {
            return <BoardSquare x={x} y={y} />;
          });
        })}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
