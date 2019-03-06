import React, { Component } from 'react';
import api from '../../Services/DepartamentoService';
import {logout} from '../../Services/AuthService';


class NovoDepartamento extends Component {

    novoDepartamento = (e) => {
        e.preventDefault();

        const departamento = {
            Nome: this.refs.nome.value
        }

        api.novoDepartamento(departamento)
            .then(res =>
                this.props.getMessages(res.data, "ok"))
            .catch(error => {
                if (error.response.status === 401) {
                    logout()
                } else {
                    this.props.getMessages(error.response.data, "nok")
                }
            })

        //limpa formulário
        this.refs.nome.value = '';
    }

    render() {
        return (
            <div className='float-right'>
                <form className='form-inline' onSubmit={this.novoDepartamento}>
                    <div className="form-group">
                        <label>Novo departamento: &nbsp;</label>
                        <input ref='nome' type="text" className="form-control" placeholder="Nome do departamento" />
                    </div>
                    &nbsp; <button type="submit" className="btn btn-succ">Salvar <i class="fas fa-check text-white"></i></button>
                </form>
            </div>

        )
    }

}
export default NovoDepartamento;