import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { urls } from '../../utils/urlUtils';
import FirebaseService from '../../services/FirebaseService';

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

  // eslint-disable-next-line constructor-super
  constructor() {
    super();
    this.state = {
      historico: null,
    }
  }

  componentDidMount = () => {
    FirebaseService.getUniqueDataBy('leituras', 'historico', data => {
      if (data && Object.keys(data).length > 0) {
        this.setState({ historico: Object.values(data).reverse() });
      }
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Typography
          variant="h5"
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
        {this.state.historico ? (
          <Button
            component={props => (
              <Link to={urls.atendimento.path} {...props} target="_blank" />
            )}
            className={classes.btnMenu}
          >
            Atendimento
          </Button>
        ) : null }
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Menu);
