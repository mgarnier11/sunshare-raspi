import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { DND_MODULE } from '../../dragAndDrop/constants';

const specs = {
  canDrag(props) {
    // You can disallow drag based on props
    return props.drag;
  },

  beginDrag(props, monitor, component) {
    // Return the data describing the dragged item
    const item = { id: props.mod.id };
    return item;
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource()
  };
}

export class BoardModule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedModule: null
    };
  }

  async componentDidMount() {
    try {
      const { mod } = this.props;

      this.setState({
        loadedModule: await import(`../../modules/${mod.componentName}`)
      });
    } catch (error) {
      this.setState({ hasError: error });
    }
  }

  render() {
    const { loadedModule } = this.state;
    const { connectDragSource, mod, moduleProps } = this.props;

    if (typeof connectDragSource === 'function') return connectDragSource(m());
    else return m();

    function m() {
      return (
        <div
          style={{
            gridRowStart: mod.position.y + 1,
            gridRowEnd: mod.position.y + 1 + mod.size.y,
            gridColumnStart: mod.position.x + 1,
            gridColumnEnd: mod.position.x + 1 + mod.size.x
          }}
          className="board-module"
        >
          {loadedModule ? (
            React.createElement(loadedModule.default.component, moduleProps)
          ) : (
            <></>
          )}
        </div>
      );
    }
  }
}

export default DragSource(DND_MODULE, specs, collect)(BoardModule);
