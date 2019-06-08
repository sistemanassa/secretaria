import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  FormControl,
  NativeSelect,
  InputLabel,
  InputBase,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import FirebaseService from '../../services/FirebaseService';

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
    marginBottom: '20px',
  },
  btnYellow: {
    backgroundColor: '#ffba01',
    color: '#000',
    width: '100%',
    marginBottom: '20px',
  },
  btnMenu: {
    display: 'block',
  },
};

class Guiche extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guiche: '',
    };
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  startAttendance = () => {
    FirebaseService.getUniqueDataBy(
      'leituras/atendimento',
      this.state.guiche,
      data =>
        this.setState({ ...data }, () => {
          FirebaseService.getDataList('leituras', dataReceived =>
            this.setState({ ...dataReceived }, () => {
              if (
                this.state.guiche.length > 0 &&
                (data === null || data.length === 0)
              ) {
                if (
                  (data === null || data.length === 0) &&
                  (dataReceived !== null && dataReceived.length > 0)
                ) {
                  var proximo = Object.keys(dataReceived[0])[0];
                  var node = {};
                  node[proximo] = dataReceived[0][proximo];
                  node[proximo].status = 'Em Atendimento';
                  var currDate = new Date();
                  var dateId = currDate.getFullYear();
                  dateId += '/';
                  dateId += currDate.getMonth() + 1 < 10 ? '0' : '';
                  dateId += currDate.getMonth() + 1;
                  dateId += '/';
                  dateId += currDate.getDate() < 10 ? '0' : '';
                  dateId += currDate.getDate();
                  dateId += ' ';
                  dateId += currDate.getHours() < 10 ? '0' : '';
                  dateId += currDate.getHours();
                  dateId += ':';
                  dateId += currDate.getMinutes() < 10 ? '0' : '';
                  dateId += currDate.getMinutes();
                  dateId += ':';
                  dateId += currDate.getSeconds() < 10 ? '0' : '';
                  dateId += currDate.getSeconds();
                  /*dateId += ':';
                  dateId += (currDate.getMilliseconds() < 10 ? '0': '');
                  dateId += currDate.getMilliseconds();*/
                  //console.log(node);
                  node[proximo].guiche = this.state.guiche;
                  node[proximo].inicio = dateId;
                  FirebaseService.updateData(
                    this.state.guiche,
                    'leituras/atendimento',
                    node
                  );
                  dataReceived[0][proximo].guiche = node[proximo].guiche;
                  dataReceived[0][proximo].status = node[proximo].status;
                  dataReceived[0][proximo].inicio = node[proximo].inicio;
                  FirebaseService.updateData(
                    proximo,
                    'leituras/historico',
                    dataReceived[0][proximo]
                  );

                  this.setState({ guiche: '' });
                  FirebaseService.remove(proximo, 'leituras/aguardando');
                }
              }
            })
          );
        })
    );
  };

  endService = () => {
    FirebaseService.getUniqueDataBy(
      'leituras/atendimento',
      this.state.guiche,
      data =>
        this.setState({ ...data }, () => {
          var node = Object.keys(data);
          data[node].status = 'Encerrado';
          FirebaseService.updateData(
            node,
            'leituras/encerrado/' + this.state.guiche,
            data[node]
          );
          FirebaseService.updateData(node, 'leituras/historico', data[node]);
          FirebaseService.remove(this.state.guiche, 'leituras/atendimento');
          this.setState({ guiche: '' });
        })
    );
  };

  cancelService = () => {
    FirebaseService.getUniqueDataBy(
      'leituras/atendimento',
      this.state.guiche,
      data =>
        this.setState({ ...data }, () => {
          var node = Object.keys(data);
          data[node].status = 'Cancelado';
          FirebaseService.updateData(
            node,
            'leituras/cancelado/' + this.state.guiche,
            data[node]
          );
          FirebaseService.updateData(node, 'leituras/historico', data[node]);
          FirebaseService.remove(this.state.guiche, 'leituras/atendimento');
          this.setState({ guiche: '' });
        })
    );
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
          title="Iniciar"
          className={classes.btnGreen}
          onClick={() => this.startAttendance()}
          disabled={!this.isValid()}
        >
          Iniciar
        </Button>

        <Button
          variant="contained"
          color="primary"
          title="Encerrar"
          className={classes.btnYellow}
          onClick={() => this.endService()}
          disabled={!this.isValid()}
        >
          Encerrar
        </Button>

        <Button
          variant="contained"
          color="primary"
          title="Cancelar"
          className={classes.btnRed}
          onClick={() => this.cancelService()}
          disabled={!this.isValid()}
        >
          Cancelar
        </Button>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Guiche);
