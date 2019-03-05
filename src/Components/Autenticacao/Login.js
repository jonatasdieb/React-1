import React, { Component } from 'react';
import { saveToken } from '../../Services/AuthService';
import userService from '../../Services/UserService';
import CadastrarUsuario from './CadastrarUsuario';
import Messages from '../../Features/ValidationMessages';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: false,
            errors: false
        }
    }

    login = (e) => {
        e.preventDefault();
        var username = this.refs.username.value;
        var password = this.refs.password.value;
        
        userService.login("username=" + username + "&password=" + password + "&grant_type=password")
            .then(res => {                
                saveToken(res.data.access_token);
            })
            .then(() =>
                window.location.reload()
            ).catch(() => {
                this.setState({
                    errors: ["Dados de autenticação incorretos."]
                })
            })
    }

    showMessages = (messages, tipo) => {
        if (tipo === 'nok') {
            this.setState({
                errors: messages,
                messages: false
            })
        }

        else if (tipo === 'ok') {
            this.setState({
                errors: false,
                messages: messages,
                isLoading: true
            })            
        }
    }


    render() {
        return (
            <section>
                <div className="row justify-content-md-center">

                <Messages messages={this.state.messages} errors={this.state.errors} />

                {/* modal de cadastro de usuários */}
                <CadastrarUsuario getMessages={(messages, tipo) => this.showMessages(messages, tipo)} /> 
                  
                </div>
                <div className="row justify-content-md-center">
                    <h3>Efetuar login</h3>
                </div>
                <div className="row justify-content-md-center">
                    <form className="col-8" onSubmit={this.login}>
                        <div className="form-group">
                            <label>Usuário</label>
                            <input type="text" className="form-control" ref='username' name="usuario" id="usuario" placeholder="Usuário" />
                        </div>
                        <div className="form-group">
                            <label>Senha</label>
                            <input type="password" className="form-control" ref='password' name="senha" id="senha" placeholder="Senha" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Login <i class="fas fa-sign-in-alt text-white"></i>
                            </button> &nbsp;
                            <button type="button" className="btn btn-warning text-white" data-toggle="modal" data-target="#modalCadastrarUsuario">
                                Cadastrar <i class="fas fa-user-plus text-white"></i>
                            </button>
                        </div>
                    </form>
                </div>
              
            </section>
        )
    }
}

export default Login;