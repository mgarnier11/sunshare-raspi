import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ModuleLoader from '../ModuleLoader';

const mapStateToProps = state => {
  return {
    boardLayout: state.board.layout
  };
};

function mapDispatchToProps(dispatch) {
  return {};
}

class BoardSquare extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  };

  static defaultProps = { x: 0, y: 0 };

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.switchSquare(this.props.x, this.props.y);
  }

  render() {
    const square = this.props.boardLayout[this.props.x][this.props.y];
    if (square && square !== true) {
      const componentName = square.componentName;
      return (
        <ModuleLoader
          componentName={componentName}
          moduleProps={{
            position: { x: this.props.x, y: this.props.y }
          }}
        />
      );
    } else {
      return <> </>;
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardSquare);
