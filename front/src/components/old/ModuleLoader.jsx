import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { DND_MODULE } from '../../dragAndDrop/constants';

class ModuleLoader extends Component {
  static propTypes = {
    dnd: PropTypes.bool.isRequired,
    componentName: PropTypes.string.isRequired,
    moduleProps: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = {
      loadedModule: null
    };
  }

  componentDidCatch(error) {
    this.setState({ hasError: error });
  }

  async componentDidMount() {
    try {
      const { componentName } = this.props;
      this.setState({
        loadedModule: await import(`../modules/${componentName}`)
      });
    } catch (error) {
      this.setState({ hasError: error });
    }
  }

  render() {
    const { loadedModule, hasError } = this.state;
    const { dnd } = this.props;

    if (hasError) return <div>{hasError.message}</div>;
    if (!loadedModule) return <div>Loading module...</div>;

    if (loadedModule.default && loadedModule.default.component)
      if (dnd) {
        return (
          <Dnd m={loadedModule.default}>
            {React.createElement(
              loadedModule.default.component,
              this.props.moduleProps
            )}
          </Dnd>
        );
      } else {
        return React.createElement(
          loadedModule.default.component,
          this.props.moduleProps
        );
      }

    return <div>Module loaded</div>;
  }
}

export default ModuleLoader;

const Dnd = ({ children, m }) => {
  const [{ opacity }, dragRef] = useDrag({
    item: { type: DND_MODULE, id: m.id },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.0 : 1
    })
  });
  return (
    <div
      ref={dragRef}
      style={{
        gridRowStart: m.position.y + 1,
        gridRowEnd: m.position.y + 1 + m.size.y,
        gridColumnStart: m.position.x + 1,
        gridColumnEnd: m.position.x + 1 + m.size.x,
        backgroundColor: 'red',
        opacity
      }}
    >
      {children}
    </div>
  );
};
