import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { urls } from '../../utils/urlUtils';

const styles = {
  margin: {
    borderTop: '1px solid #333',
    borderBottom: '1px solid #333',
    margin: '15px 0 20px',
    padding: '20px 0 20px',
    display: 'block',
  },
  btnMenu: {
    display: 'block',
  },
};

class Menu extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { classes } = this.props;
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
          className={classes.btnMenu}
        >
          Home
        </Button>
        <Button
          component={props => <Link to={urls.add.path} {...props} />}
          className={classes.btnMenu}
        >
          Adicionar
        </Button>
        <Button
          component={props => <Link to={urls.data.path} {...props} />}
          className={classes.btnMenu}
        >
          Data
        </Button>
        <Button
          component={props => (
            <Link to={urls.atendimento.path} {...props} target="_blank" />
          )}
          className={classes.btnMenu}
        >
          Atendimento
        </Button>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Menu);
