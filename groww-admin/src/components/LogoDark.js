import React from 'react';
import logoDark from 'src/assets/logo-dark.svg';

function LogoDark(props) {
  return (
    <img
      alt="Logo Dark"
      src={logoDark}
      {...props}
    />
  );
}

export default LogoDark;