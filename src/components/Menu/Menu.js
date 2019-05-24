import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Button,
  Typography,
  FormControl,
  NativeSelect,
  InputLabel,
  InputBase,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { urls } from '../../utils/urlUtils';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginLeft: theme.spacing.unit * 1,
      marginTop: theme.spacing.unit * 1,
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '40px',
    padding: '5px 25px 5px 5px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      backgroundColor: theme.palette.background.paper,
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.1rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const styles = {
  margin: {
    borderTop: '1px solid #333',
    borderBottom: '1px solid #333',
    margin: '15px 0 20px',
    padding: '20px 0 20px',
    display: 'block',
  },
  bootstrapFormLabel: {
    color: 'rgba(0, 0, 0, 0.87)',
    padding: '6px 6px',
    fontWeight: '500',
    letterSpacing: '0.02857em',
    textTransform: 'uppercase',
    position: 'static',
  },
  btnGreen: {
    background: 'green',
    width: '100%',
    marginBottom: '20px',
  },
  btnRed: {
    background: 'red',
    width: '100%',
  },
  btnMenu: {
    display: 'block',
  },
};

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guiche: '',
    };
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  handleChangeGuiche = evt => {
    this.setState({ guiche: evt.target.value });
  };

  /* Valid field */
  isValid = () => {
    return this.state.guiche.length !== 0;
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
          component={props => <Link to={urls.data.path} {...props} />}
          className={classes.btnMenu}
        >
          Data
        </Button>
        <Button
          component={props => <Link to={urls.add.path} {...props} />}
          className={classes.btnMenu}
        >
          Adicionar
        </Button>
        <Button
          component={props => (
            <Link to={urls.atendimento.path} {...props} target="_blank" />
          )}
          className={classes.btnMenu}
        >
          Atendimento
        </Button>

        <FormControl className={classes.margin}>
          <InputLabel
            shrink
            htmlFor="age-customized-native-simple"
            className={classes.bootstrapFormLabel}
            focused={false}
          >
            Guichê
          </InputLabel>
          <NativeSelect
            value={this.state.guiche}
            onChange={this.handleChangeGuiche}
            input={
              <BootstrapInput name="age" id="age-customized-native-simple" />
            }
          >
            <option value="" />
            <option value={'G1'}>G1</option>
            <option value={'G2'}>G2</option>
            <option value={'G3'}>G3</option>
          </NativeSelect>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          title="Chamar"
          className={classes.btnGreen}
          // onclick={() => remove(item.key)}
          disabled={!this.isValid()}
        >
          Chamar
        </Button>

        <Button
          variant="contained"
          color="primary"
          title="Encerrar"
          className={classes.btnRed}
          // onclick={() => remove(item.key)}
          disabled={!this.isValid()}
        >
          Encerrar
        </Button>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Menu);
