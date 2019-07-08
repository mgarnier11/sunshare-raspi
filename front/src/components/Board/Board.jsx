import React, { Component } from 'react';
import { connect } from 'react-redux';

import BoardSquare from './BoardSquare';
import { addModule } from '../../redux/actions/board-actions';

import modules from '../../modules/index';
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

    console.log(modules);
    this.props.addModule({
      componentName: modules[1].componentName,
      position: { x: 7, y: 2 },
      size: modules[1].size
    });
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
          {[...Array(this.props.board.height)].map((valueX, x) => {
            return [...Array(this.props.board.width)].map((valueY, y) => {
              return <BoardSquare x={x} y={y} key={(x + 1) * (y + 1)} />;
            });
          })}
          {this.props.board.modules.map(m => {
            return (
              <ModuleLoader
                key={m.id}
                componentName={m.componentName}
                moduleProps={{
                  position: { x: m.position.x, y: m.position.y },
                  id: m.id
                }}
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
)(Board);
