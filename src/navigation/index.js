import React from 'react';
import {ProvideAuth} from '../context/auth';
import Routes from './Routes';

const Providers = () => {
  return (
    <ProvideAuth>
      <Routes />
    </ProvideAuth>
  );
};

export default Providers;
