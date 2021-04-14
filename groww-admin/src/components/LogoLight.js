import React from 'react';
import logoLight from 'src/assets/logo-light.svg';

function LogoLight(props) {
  return (
    <img
      alt="Logo Light"
      src={logoLight}
      {...props}
    />
  );
}

export default LogoLight;