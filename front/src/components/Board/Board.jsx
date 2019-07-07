import React, { Component } from 'react';
import { connect } from 'react-redux';

import BoardSquare from './BoardSquare';
import { addModule } from '../../redux/actions/board-actions';

import Patate from '../../modules/Patate';
import Test from '../../modules/Test';
import ModuleLoader from '../ModuleLoader';

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

    this.props.addModule({
      componentName: Patate.componentName,
      position: { x: 7, y: 2 },
      size: Patate.size
    });

    this.props.addModule({
      componentName: Patate.componentName,
      position: { x: 7, y: 2 },
      size: Patate.size
    });
  }

  render() {
    return (
      <div
        className="board"
        style={{
          gridTemplateColumns: 'repeat(' + this.props.board.width + ', 1fr)',
          gridTemplateRows: 'repeat(' + this.props.board.height + ', 1fr)'
        }}
      >
        {[...Array(this.props.board.height)].map((valueX, x) => {
          return [...Array(this.props.board.width)].map((valueY, y) => {
            return <BoardSquare x={x} y={y} />;
          });
        })}
        {this.props.board.modules.map(m => {
          return (
            <ModuleLoader
              componentName={m.componentName}
              moduleProps={{
                position: { x: m.position.x, y: m.position.y },
                id: m.id
              }}
            />
          );
        })}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
