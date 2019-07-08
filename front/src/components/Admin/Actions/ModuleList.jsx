import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addModule } from '../../../redux/actions/board-actions';
import modules from '../../../modules';

function mapDispatchToProps(dispatch) {
  return { addModule: m => dispatch(addModule(m)) };
}

class ModuleList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modules
    };

    this.onButtonAddClick = this.onButtonAddClick.bind(this);
  }
  onButtonAddClick(m) {
    this.props.addModule({
      componentName: m.componentName,
      position: { x: 0, y: 0 },
      size: m.size
    });
  }

  render() {
    return (
      <div className="list">
        {this.state.modules.map(m => (
          <button
            className="btn btn-primary"
            onClick={() => this.onButtonAddClick(m)}
          >
            Add {m.componentName}
          </button>
        ))}
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ModuleList);
