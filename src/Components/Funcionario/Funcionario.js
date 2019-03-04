import React, { Component } from 'react';
import NovoFuncionario from './NovoFuncionario';
import funcionarioService from '../../Services/FuncionarioService';
import Messages from '../../Features/ValidationMessages';
import { logout } from '../../Services/AuthService';

class Funcionario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            funcionarios: [],
            errors: false,
            messages: false
        }
    }

    loadFuncionarios() {
        funcionarioService.getFuncionarios()
            .then(res =>
                this.setState({
                    funcionarios: res.data,
                    isLoading: false
                })
            ).catch(e => {
                if (e.response.status === 401) {
                    logout();
                }

                this.setState({
                    errors: e.response.data
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

            this.loadFuncionarios();
        }
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })

        this.loadFuncionarios();
    }

    render() {
        return (
            <div>

                <Messages messages={this.state.messages} errors={this.state.errors} />

                <h3 className="text-center mt-4">Funcionários</h3>

                <NovoFuncionario getMessages={(messages, tipo) => this.showMessages(messages, tipo)} />

                <table className='table table-sm table-hover table-light table-bordered mt-2'>
                    <thead className="bg-table text-light">
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Departamento</th>
                        </tr>

                    </thead>
                    <tbody>
                        {this.state.funcionarios.map(value => {
                            return (
                                <tr key={value.Id}>
                                    <td>{value.Id}</td>
                                    <td>{value.Nome}</td>
                                    <td>{value.Departamento.Nome}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {
                    this.state.isLoading &&
                    <div className="row justify-content-center ">
                        <div className="spinner-border text-danger mt-5" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                }
            </div >
        )
    }

}

export default Funcionario;