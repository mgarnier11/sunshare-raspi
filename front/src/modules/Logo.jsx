import React from 'react';
import logo from '../assets/images/logo.png';

const componentName = 'Logo';
const size = { x: 3, y: 1 };

const Logo = () => <img src={logo} style={{ height: '100%', width: '100%' }} />;

const Module = {
  componentName,
  component: Logo,
  size
};

export default Module;
