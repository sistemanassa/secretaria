import React, { Component } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import FirebaseService from '../../services/FirebaseService';
import { urls } from '../../utils/urlUtils';
import { withRouter } from 'react-router-dom';

class Add extends Component {
  state = { id: null, nome: '', cpf: '', matricula: '', email: '' };

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

    const { nome } = this.state;
    const { cpf } = this.state;
    const { matricula } = this.state;
    const { email } = this.state;

    const objToSubmit = {
      nome,
      cpf,
      matricula,
      email,
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
            value={this.state.nome}
            label="Nome"
            required
            onChange={this.handleChange('nome')}
            style={{ marginBottom: '20px' }}
          />

          <TextField
            fullWidth={true}
            className="input-field"
            type="text"
            label="CPF"
            value={this.state.cpf}
            required
            onChange={this.handleChange('cpf')}
            style={{ marginBottom: '20px' }}
          />

          <TextField
            fullWidth={true}
            className="input-field"
            type="text"
            label="Matrícula"
            value={this.state.matricula}
            required
            onChange={this.handleChange('matricula')}
            style={{ marginBottom: '20px' }}
          />

          <TextField
            fullWidth={true}
            className="input-field"
            type="email"
            label="E-mail"
            value={this.state.email}
            required
            onChange={this.handleChange('email')}
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
