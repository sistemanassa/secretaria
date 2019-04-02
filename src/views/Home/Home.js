import React, { Component } from 'react';
import { Paper } from '@material-ui/core';
import { DataTable } from '../../components/DataTable/DataTable';
import FirebaseService from '../../services/FirebaseService';
import { Route, withRouter } from 'react-router-dom';
import { privateUrls, urls } from '../../utils/urlUtils';
import Add from '../../components/Add/Add';
import { Menu } from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Login from '../Login/Login';
import Attendance from '../../components/Attendance/Attendance';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { login, logout } from '../../action/actionCreator';
import NavigationWrapper from '../../components/NavigationWrapper/NavigationWrapper';
import NavigationLoggedWrapper from '../../components/NavigationWrapper/NavigationLoggedWrapper';

class Home extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    FirebaseService.onAuthChange(
      authUser => this.props.login(authUser),
      () => this.props.logout()
    );
    FirebaseService.getDataList('leituras', dataReceived =>
      this.setState({ data: dataReceived })
    );
  }

  render() {
    return (
      <div>
        <Header />
        <Route
          exact
          path={urls.login.path}
          render={props => (
            <NavigationLoggedWrapper component={Login} {...props} />
          )}
        />
        <Route
          exact
          path={urls.home.path}
          render={props => <NavigationWrapper component={Menu} {...props} />}
        />
        <Paper elevation={4} style={{ margin: '16px' }}>
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
          <Route exact path="/Attendance" component={Attendance} />
          <Route
            exact
            path={privateUrls.edit.path}
            render={props => <NavigationWrapper component={Add} {...props} />}
          />
        </Paper>
        <Footer />
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
