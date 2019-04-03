import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Typography, Toolbar } from '@material-ui/core';

const styles = {
  root: {
    margin: 0,
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    position: 'fixed',
    top: 'auto',
    bottom: 0,
    height: '3vh',
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 'auto',
  },
};

class Footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <footer className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Typography
              variant="subtitle1"
              color="inherit"
              className={classes.grow}
            >
              Desenvolvimento
            </Typography>
            {/* <Typography variant="subtitle1" color="inherit">
              Powered by
            </Typography> */}
          </Toolbar>
        </AppBar>
      </footer>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);