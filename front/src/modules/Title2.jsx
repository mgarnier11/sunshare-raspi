import React from 'react';

const componentName = 'Title2';
const size = { x: 10, y: 1 };

const Title2 = () => (
  <div className="row">
    <h4 className="col-6" style={{ color: 'red' }}>
      Consommation électrique
    </h4>
    <h4 className="col-6" style={{ color: 'green' }}>
      Production électrique
    </h4>
  </div>
);

const Module = {
  componentName,
  component: Title2,
  size
};

export default Module;
