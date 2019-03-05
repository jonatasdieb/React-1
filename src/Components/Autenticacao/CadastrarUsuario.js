import React, { Component } from 'react';
import userService from '../../Services/UserService';
import $ from 'jquery';

class CadastrarUsuario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: []
        }
    }

    cadastrarUsuario = (e) => {
        e.preventDefault();
        $('#closeModal').click();


        userService.cadastrar({
            username: this.refs.username.value,
            password: this.refs.password.value,
            confirmPassword: this.refs.confirmPassword.value
        })
            .then(res =>
                this.props.getMessages(res.data, "ok"))
            .catch(error =>
                this.props.getMessages(error.response.data, "nok")
            )

        //limpa formulário
        this.refs.username.value = '';
        this.refs.password.value = ''
        this.refs.confirmPassword.value = '';
    }


    render() {
        return (
            <div className="modal fade" id="modalCadastrarUsuario" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Cadastrar</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={this.cadastrarUsuario}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Nome de Usuário</label>
                                    <input type="text" ref="username" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Senha</label>
                                    <input type="password" ref="password" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Confirmar Senha</label>
                                    <input type="password" ref="confirmPassword" className="form-control" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" id="closeModal">Cancelar <i class="fas fa-times-circle text-white"></i></button>
                                <button type="submit" className="btn btn-primary">Cadastrar <i class="fas fa-check text-white"></i></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default CadastrarUsuario;