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
      modules,
      selectedModule: ''
    };

    this.onButtonAddClick = this.onButtonAddClick.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  onButtonAddClick(m) {
    this.props.addModule({
      componentName: m.componentName,
      position: { x: 0, y: 0 },
      size: m.size
    });
  }

  render() {
    const { selectedModule, modules } = this.state;

    return (
      <form className="list form-inline">
        <div class="form-group">
          <select
            class="form-control"
            id="selectedModule"
            onChange={this.handleChange}
            value={selectedModule}
          >
            {modules.map(m => {
              return (
                <option value={m.id} key={m.id}>
                  {m.componentName}
                </option>
              );
            })}
          </select>
        </div>
      </form>
    );
  }
}

/*
            {this.state.modules.map(m => (
              <button
                className="btn btn-primary"
                onClick={() => this.onButtonAddClick(m)}
              >
                Add {m.componentName}
              </button>
            ))}
*/
export default connect(
  null,
  mapDispatchToProps
)(ModuleList);
