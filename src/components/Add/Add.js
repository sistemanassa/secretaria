import {Button, TextField, Typography} from "@material-ui/core";
import React, {Component} from "react";
import FirebaseService from "../../services/FirebaseService";
import {urls} from "../../utils/urlUtils";
import {withRouter} from "react-router-dom";
import { Menu } from "../../components/Menu/Menu";

class Add extends Component {

    state = {id: null, nome: '', cpf: '', matricula: '', email: ''};

    componentWillMount = () => {
        const {id} = this.props.match.params;

        if (!(id === undefined || !id)) {
            this.setState({id});
            FirebaseService.getUniqueDataBy('leituras', id, (data) => this.setState({...data}, () => console.log(this.state)));
        }

    };

    submit = (event) => {
        event.preventDefault();

        const {nome} = this.state;
        const {cpf} = this.state;
        const {matricula} = this.state;
        const {email} = this.state;

        let objToSubmit = {
            nome,
            cpf,
            matricula,
            email
        };

        if (this.props.match.params.id === undefined) {
            FirebaseService.pushData('leituras', objToSubmit);
        } else {
            FirebaseService.updateData(this.props.match.params.id, 'leituras', objToSubmit)
        }

        this.props.history.push(urls.data.path);

    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render = () => {
        return (<React.Fragment>
            <Menu />
            <Typography variant="headline" component="h2">Adicionar novo cadastro</Typography>
            <form onSubmit={this.submit}>
                <TextField className="input-field"
                           type="text"
                           value={this.state.nome}
                           label="Nome"
                           required
                           onChange={this.handleChange('nome')}/>

                <TextField className="input-field"
                           type="text"
                           label="CPF"
                           value={this.state.cpf}
                           required
                           onChange={this.handleChange('cpf')}/>

                <TextField className="input-field"
                           type="text"
                           label="Matrícula"
                           value={this.state.matricula}
                           required
                           onChange={this.handleChange('matricula')}/>

                <TextField className="input-field"
                           type="email"
                           label="E-mail"
                           value={this.state.email}
                           required
                           onChange={this.handleChange('email')}/>

                <Button 
                    variant="contained" 
                    type="submit"
                    style={{marginTop: '20px', display: 'inline-block'}}
                >
                    Cadastrar
                </Button>
            </form>
        </React.Fragment>)
    }
}

export default withRouter(Add);