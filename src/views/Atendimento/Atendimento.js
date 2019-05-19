import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Paper } from '@material-ui/core';

import FirebaseService from '../../services/FirebaseService';
import { privateUrls, urls } from '../../utils/urlUtils';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Menu } from '../../components/Menu/Menu';
import { DataTable } from '../../components/DataTable/DataTable';
import Add from '../../components/Add/Add';
import Atendimento from '../../components/Atendimento/Atendimento';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { login, logout } from '../../action/actionCreator';
import NavigationWrapper from '../../components/NavigationWrapper/NavigationWrapper';

class Home extends Component {
  state = {
    data: [],
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
    return (
      <div>
        <NavigationWrapper component={Header} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '14vw calc(100vw - 14vw)',
            width: '100vw',
            height: 'calc(100vh - 95px)',
            }}
        >
          <Paper
            elevation={4}
            style={{
              margin: '16px 0 16px 16px',
              padding: '16px',
              width: 'calc(14vw - 48px)',
            }}
          >
            <NavigationWrapper component={Menu} />
          </Paper>
          <Paper
            elevation={4}
            style={{
              margin: '16px',
              padding: '16px',
              width: 'calc(100vw - 64px - 14vw)',
            }}
          >
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
              render={props => <NavigationWrapper component={Add} {...props} />}
            />
            <Route
              exact
              path={privateUrls.edit.path}
              render={props => <NavigationWrapper component={Add} {...props} />}
            />
          </Paper>
        </div>
        <Route exact path="/Atendimento" component={Atendimento} />
        <NavigationWrapper component={Footer} />
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
  withRouter,
  connect(
    null,
    mapDispatchToProps
  )
)(Home);
