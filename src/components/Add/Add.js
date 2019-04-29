import React, { Component } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import FirebaseService from '../../services/FirebaseService';
import { urls } from '../../utils/urlUtils';
import { withRouter } from 'react-router-dom';

class Add extends Component {
  state = { id: null, temperatura: '', umidade: '', data: '', cliente: '' };

  componentWillMount = () => {
    // eslint-disable-next-line react/prop-types
    const { id } = this.props.match.params;

    if (!(id === undefined || !id)) {
      this.setState({ id });
      FirebaseService.getUniqueDataBy('leituras', id, data =>
        this.setState({ ...data }, () => console.log(this.state))
      );
    }
  };

  submit = event => {
    event.preventDefault();

    const { temperatura } = this.state;
    const { umidade } = this.state;
    const { data } = this.state;
    const { cliente } = this.state;

    const objToSubmit = {
      temperatura,
      umidade,
      data,
      cliente,
    };

    // eslint-disable-next-line react/prop-types
    if (this.props.match.params.id === undefined) {
      FirebaseService.pushData('leituras', objToSubmit);
    } else {
      FirebaseService.updateData(
        // eslint-disable-next-line react/prop-types
        this.props.match.params.id,
        'leituras',
        objToSubmit
      );
    }

    // eslint-disable-next-line react/prop-types
    this.props.history.push(urls.data.path);
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render = () => {
    return (
      <React.Fragment>
        <Typography
          variant="headline"
          component="h2"
          style={{ marginBottom: '10px' }}
        >
          Novo Cadastro
        </Typography>

        <form onSubmit={this.submit}>
          <TextField
            fullWidth={true}
            className="input-field"
            type="text"
            value={this.state.temperatura}
            label="Temperature"
            required
            onChange={this.handleChange('temperatura')}
            style={{ marginBottom: '20px' }}
          />

          <TextField
            fullWidth={true}
            className="input-field"
            type="text"
            label="Humidity"
            value={this.state.umidade}
            required
            onChange={this.handleChange('umidade')}
            style={{ marginBottom: '20px' }}
          />

          <TextField
            fullWidth={true}
            className="input-field"
            type="text"
            label="Date"
            value={this.state.data}
            required
            onChange={this.handleChange('data')}
            style={{ marginBottom: '20px' }}
          />

          <TextField
            fullWidth={true}
            className="input-field"
            type="email"
            label="Client"
            value={this.state.cliente}
            required
            onChange={this.handleChange('cliente')}
            style={{ marginBottom: '20px' }}
          />

          <Button
            variant="contained"
            type="submit"
            style={{ marginTop: '20px', display: 'inline-block' }}
          >
            Adicionar
          </Button>
        </form>
      </React.Fragment>
    );
  };
}

export default withRouter(Add);
