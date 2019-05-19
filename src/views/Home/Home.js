import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import FirebaseService from '../../services/FirebaseService';
import { urls } from '../../utils/urlUtils';

import Login from '../../components/Login/Login';
import Atendimento from '../../views/Atendimento/Atendimento';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { login, logout } from '../../action/actionCreator';
import NavigationLoggedWrapper from '../../components/NavigationWrapper/NavigationLoggedWrapper';

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
    const notInLogin = /^(?!.*(\Login)).*$/;
    return (
      <div>
        <Route
          exact
          path={urls.login.path}
          render={props => (
            <NavigationLoggedWrapper component={Login} {...props} />
          )}
        />
        <Route path={notInLogin} render={() => <Atendimento />} />
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
