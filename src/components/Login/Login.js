import React, { Component, Fragment } from 'react';
import { Button, TextField, Typography, Paper } from '@material-ui/core';
import FirebaseService from '../../services/FirebaseService';
import { urls } from '../../utils/urlUtils';
import { withRouter } from 'react-router-dom';

const styles = {
  areaLogin: {
    margin: '16px auto',
    padding: '16px',
    width: '30%',
  },
  textField: {
    width: '100%',
  },
};

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  login = event => {
    event.preventDefault();
    const { email } = this.state;
    const { password } = this.state;
    FirebaseService.login(email, password)
      .then(() => {
        this.props.history.push(urls.home.path);
      })
      .catch(error => {
        alert(error.message);
      });
  };

  createUser = event => {
    event.preventDefault();
    const { email } = this.state;
    const { password } = this.state;

    FirebaseService.createUser(email, password)
      .then(user => {
        this.props.history.push(urls.home.path);
        console.log(user);
      })
      .catch(error => {
        alert(error.message);
      });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render = () => {
    return (
      <Paper elevation={4} style={styles.areaLogin}>
        <Fragment>
          <Typography variant="headline" component="h2">
            Login
          </Typography>
          <form onSubmit={this.login}>
            <TextField
              style={styles.textField}
              type="email"
              value={this.state.email}
              label="email"
              required
              onChange={this.handleChange('email')}
            />
            <TextField
              style={styles.textField}
              type="password"
              value={this.state.password}
              label="password"
              required
              onChange={this.handleChange('password')}
            />

            <Button
              variant="contained"
              type="submit"
              style={{ marginTop: '20px', display: 'inline-block' }}
            >
              Login
            </Button>

            {/* <Button 
                        variant="contained"
                        onClick={this.createUser}
                        style={{marginTop: '20px', display: 'inline-block'}}
                    >
                        New User
                    </Button> */}
          </form>
        </Fragment>
      </Paper>
    );
  };
}

export default withRouter(Login);