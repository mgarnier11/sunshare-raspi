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
      selectedModule: '',
      selectedProp: '',
      propValue: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleModuleChange = this.handleModuleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleModuleChange(event) {
    this.setState({ selectedModule: event.target.value, selectedProp: '' });
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.selectedModule) {
      let m = modules.find(m => m.componentName === this.state.selectedModule);

      this.props.addModule({
        componentName: m.componentName,
        position: { x: 0, y: 0 },
        size: m.size
      });
    }
  }

  render() {
    const { selectedModule, modules, selectedProp } = this.state;
    /*
    let m = modules.find(m => m.componentName === selectedModule);

    let prop;

    if (m && m.props) {
      prop = m.props.find(p => p.name === selectedProp);
    }
*/
    return (
      <form className="list form-inline h-100" onSubmit={this.handleSubmit}>
        <div className="form-group x-2">
          <label htmlFor="selectedModule">Select Module</label>

          <select
            className="ml-2 form-control"
            id="selectedModule"
            onChange={this.handleModuleChange}
            value={selectedModule}
          >
            <option selected value="">
              Choose...
            </option>

            {modules.map(m => {
              return (
                <option value={m.componentName} key={m.componentName}>
                  {m.componentName}
                </option>
              );
            })}
          </select>
        </div>
        {selectedModule ? (
          <button type="submit" class="ml-3 btn btn-primary">
            Add Module
          </button>
        ) : null}

        {/*
        {m && m.props ? (
          <div className="form-group mx-2">
            <label htmlFor="selectedProp">Set Propertie</label>

            <select
              className="ml-2 form-control"
              id="selectedProp"
              onChange={this.handleChange}
              value={selectedProp}
            >
              <option selected>Choose...</option>

              {m.props.map(prop => {
                return <option value={prop.name}>{prop.name}</option>;
              })}
            </select>
          </div>
        ) : null}
        {prop ? this.renderProp(prop) : null}
            */}
      </form>
    );
  }

  renderProp(prop) {
    switch (prop.type) {
      case 'string':
        return (
          <div className="form-group">
            <label htmlFor="propValue">{prop.name}</label>
            <input
              type="text"
              className="ml-2  form-control"
              id="propValue"
              onChange={this.handleChange}
            />
          </div>
        );
      case 'number':
        return (
          <div className="form-group">
            <label htmlFor="propValue">{prop.name}</label>
            <input
              type="number"
              className="ml-2  form-control"
              id="propValue"
              onChange={this.handleChange}
            />
          </div>
        );
      default:
        return (
          <div className="form-group">
            <label htmlFor="propValue">{prop.name}</label>
            <input
              type="text"
              className="ml-2 form-control"
              id="propValue"
              onChange={this.handleChange}
            />
          </div>
        );
    }
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
