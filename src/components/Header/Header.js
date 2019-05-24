import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  withStyles,
  Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { urls } from '../../utils/urlUtils';
import { logout } from '../../action/actionCreator';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  btn: {
    marginLeft: '20px',
    fontSize: '0.875rem',
  },
};

const mapStateToProps = state => {
  return { userAuth: state.userAuth };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

// eslint-disable-next-line react/prop-types
const TopBar = ({ userAuth, logout, classes }) => (
  <AppBar position="static">
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="Menu"
        component={props => <Link to={urls.home.path} {...props} />}
      >
        <MenuIcon />
      </IconButton>

      <Typography
        variant="headline"
        component="h2"
        type="title"
        color="inherit"
        className={classes.flex}
      >
        Atendimento
      </Typography>

      {userAuth && (
        <Fragment>
          <Typography
            type="title"
            color="inherit"
            style={{ marginLeft: '20px' }}
          >
            Usuário: {userAuth.email}
          </Typography>
          <Typography
            type="title"
            color="inherit"
            style={{ marginLeft: '20px' }}
          >
            Guichê: {userAuth.guiche}
          </Typography>

          <Button
            variant="contained"
            className={classes.btn}
            onClick={() => logout()}
            title="Logout"
          >
            Logout
          </Button>
        </Fragment>
      )}
    </Toolbar>
  </AppBar>
);

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TopBar);
