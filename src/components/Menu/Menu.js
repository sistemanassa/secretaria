import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';

import { urls } from '../../utils/urlUtils';

export const Menu = () => {
  const navigateTo = () => {
    window.open('/Atendimento');
  };

  return (
    <React.Fragment>
      <Typography
        variant="headline"
        component="h2"
        style={{ marginBottom: '10px' }}
      >
        Menu
      </Typography>
      {Object.values(urls).map((url, index) => {
        return (
          <Button
            key={index}
            component={props => <Link to={url.path} {...props} />}
            style={{ display: 'block' }}
          >
            {url.name}
          </Button>
        );
      })}
      <Button style={{ display: 'block' }}>
        <Link
          to="/Atendimento"
          onClick={navigateTo}
          style={{ textDecoration: 'none', color: '#333' }}
        >
          Atendimento
        </Link>
      </Button>
    </React.Fragment>
  );
};
