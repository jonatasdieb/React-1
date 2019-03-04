import React, { Component } from 'react';
import NovoDepartamento from './NovoDepartamento';
import departamentoService from '../../Services/DepartamentoService';
import Messages from '../../Features/ValidationMessages';
import { logout } from '../../Services/AuthService';


class Departamento extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            departamentos: [],
            messages: false,
            errors: false
        }
    }

    loadDepartamentos() {
        departamentoService.getDepartamentos()
            .then(res => this.setState({
                departamentos: res.data,
                isLoading: false
            }))
            .catch(e => {
                if (e.response.status === 401) {
                    logout();
                }

                this.setState({
                    errors: e.response.data
                })
            })
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        this.loadDepartamentos();
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

            this.loadDepartamentos();
        }
    }

    render() {
        return (
            <div>

                <Messages messages={this.state.messages} errors={this.state.errors} />

                <h3 className="text-center mt-4">Departamentos</h3>

                <NovoDepartamento getMessages={(messages, tipo) => this.showMessages(messages, tipo)}></NovoDepartamento>

                <table className='table table-sm table-hover table-light table-bordered mt-2'>
                    <thead className="bg-table text-light">
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                        </tr>

                    </thead>
                    <tbody>
                        {this.state.departamentos.map(value => {
                            return (
                                <tr key={value.Id}>
                                    <td>{value.Id}</td>
                                    <td>{value.Nome}</td>
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
            </div>
        )
    }

}

export default Departamento;