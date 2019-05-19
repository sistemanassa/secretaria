import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import FirebaseService from '../../services/FirebaseService';
import { urls } from '../../utils/urlUtils';

import Login from '../../components/Login/Login';
import Atendimento from '../../views/Atendimento/Atendimento';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { login, logout } from '../../action/actionCreator';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import AtendimentoComp from '../../components/Atendimento/Atendimento';
import NavigationLoggedWrapper from '../../components/NavigationWrapper/NavigationLoggedWrapper';
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
    const notInLoginOrAtendimento = /^(?!.*(\Login|\Atendimento)).*$/;
    return (
      <div>
        <Route
          exact
          path={urls.login.path}
          render={props => (
            <NavigationLoggedWrapper component={Login} {...props} />
          )}
        />
        <Route
          exact
          path={urls.atendimento.path}
          render={props => (
            <NavigationWrapper component={AtendimentoComp} {...props} />
          )}
        />
        <Route
          path={notInLoginOrAtendimento}
          render={() =>
            <React.Fragment>
              <NavigationWrapper component={Header} />
              <Atendimento />
              <NavigationWrapper component={Footer} />
            </React.Fragment>
          }
        />
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
