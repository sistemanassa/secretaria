import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import { Paper, withStyles } from '@material-ui/core';

import FirebaseService from '../../services/FirebaseService';
import { privateUrls, urls } from '../../utils/urlUtils';

import Menu from '../../components/Menu/Menu';
import { DataTable } from '../../components/DataTable/DataTable';
import Add from '../../components/Add/Add';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { login, logout } from '../../action/actionCreator';
import NavigationWrapper from '../../components/NavigationWrapper/NavigationWrapper';

const styles = {
  gridRow: {
    display: 'grid',
    gridTemplateColumns: '14vw calc(100vw - 14vw)',
    width: '100vw',
    height: 'calc(100vh - 95px)',
  },
  menu: {
    overflow: 'auto',
    height: 'calc(100vh - 158px)',
  },
  paperMenu: {
    margin: '16px 0 16px 16px',
    padding: '16px',
    width: 'calc(14vw - 48px)',
  },
  paperContent: {
    margin: '16px',
    padding: '16px',
    width: 'calc(100vw - 64px - 14vw)',
    overflow: 'hidden',
  },
  routeContent: {
    overflow: 'auto',
    height: 'calc(100vh - 158px)',
  },
};

class Home extends Component {
  state = {
    data: [],
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  componentDidMount() {
    FirebaseService.onAuthChange(
      // eslint-disable-next-line react/prop-types
      authUser => this.props.login(authUser),
      // eslint-disable-next-line react/prop-types
      () => this.props.logout()
    );
    FirebaseService.getDataList('leituras', dataReceived =>
      this.setState({ data: dataReceived })
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.gridRow}>
          <Paper className={classes.paperMenu} elevation={4}>
            <div className={classes.menu}>
              <NavigationWrapper component={Menu} />
            </div>
          </Paper>
          <Paper className={classes.paperContent} elevation={4}>
            <div className={classes.routeContent}>
              <Route
                exact
                path={urls.data.path}
                render={props => (
                  <NavigationWrapper
                    component={DataTable}
                    {...props}
                    data={this.state.data}
                  />
                )}
              />
              <Route
                exact
                path={urls.add.path}
                render={props => (
                  <NavigationWrapper component={Add} {...props} />
                )}
              />
              <Route
                exact
                path={privateUrls.edit.path}
                render={props => (
                  <NavigationWrapper component={Add} {...props} />
                )}
              />
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: authUser => dispatch(login(authUser)),
    logout: () => dispatch(logout()),
  };
};

export default compose(
  withStyles(styles),
  withRouter,
  connect(
    null,
    mapDispatchToProps
  )
)(Home);
