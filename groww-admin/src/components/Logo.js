import React from 'react';
import logo from 'src/assets/logo.svg';

function Logo(props) {
  return (
    <img
      alt="Logo "
      src={logo}
      {...props}
    />
  );
}

export default Logo;