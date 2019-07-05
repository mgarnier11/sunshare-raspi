import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ModuleLoader extends Component {
  static propTypes = {
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

    if (hasError) return <div>{hasError.message}</div>;
    if (!loadedModule) return <div>Loading module...</div>;

    if (loadedModule.default && loadedModule.default.component)
      return React.createElement(
        loadedModule.default.component,
        this.props.moduleProps
      );

    return <div>Module loaded</div>;
  }
}

export default ModuleLoader;
