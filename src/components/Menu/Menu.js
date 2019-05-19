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
      <Button
        component={props => <Link to={urls.home.path} {...props} />}
        style={{ display: 'block' }}
      >
        Home
      </Button>
      <Button
        component={props => <Link to={urls.data.path} {...props} />}
        style={{ display: 'block' }}
      >
        Data
      </Button>
      <Button
        component={props => <Link to={urls.add.path} {...props} />}
        style={{ display: 'block' }}
      >
        Adicionar
      </Button>
      <Button
        component={props => <Link to={urls.atendimento.path} {...props} />}
        onClick={navigateTo}
        style={{ display: 'block' }}
      >
        Atendimento
      </Button>
    </React.Fragment>
  );
};
