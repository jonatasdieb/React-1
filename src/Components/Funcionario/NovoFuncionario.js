import React, { Component } from 'react';
import funcionarioService from '../../Services/FuncionarioService';
import departamentoService from '../../Services/DepartamentoService';


class NovoFuncionario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            departamentos: []
        }
    }

    novoFuncionario = () => {
        funcionarioService.novoFuncionario({
            Nome: this.refs.nome.value,
            DepartamentoId: this.refs.departamento.value
        })
            .then(res =>
                this.props.getMessages(res.data, "ok"))
            .catch(error => {
                if (error.response.status === 401) {
                    window.location.replace("/")
                } else {
                    this.props.getMessages(error.response.data, "nok")
                }
            })




        //limpa formulários
        this.refs.nome.value = '';
        this.refs.departamento.value = '';
    }

    componentDidMount() {
        departamentoService.getDepartamentos()
            .then(res => this.setState({
                departamentos: res.data
            }))
    }

    render() {
        return (
            <div>
                <form className="form-inline float-right mt-3">
                    <div className="form-group">
                        <label>Novo funcionário: &nbsp;</label>
                        <input type="text" ref='nome' className='form-control' placeholder="Nome" required />
                    </div>
                    <div className="form-group">
                        <select ref='departamento' className='custom-select'>
                            <option value=''>Selecione um departamento</option>
                            {this.state.departamentos.map((value) => {
                                return (
                                    <option key={value.Id} value={value.Id}>{value.Nome}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-group">&nbsp;
                    <button type='button' className='btn btn-succ' onClick={this.novoFuncionario}>Salvar <i class="fas fa-check text-white"></i></button>
                    </div>
                </form>
            </div>
        )
    }
}

export default NovoFuncionario;