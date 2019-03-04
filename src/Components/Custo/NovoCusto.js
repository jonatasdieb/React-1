import React, { Component } from 'react';
import custoService from '../../Services/CustoService';
import funcionarioService from '../../Services/FuncionarioService';
import departamentoService from '../../Services/DepartamentoService';

class NovoCusto extends Component {
    constructor(props) {
        super(props);

        this.state = {
            departamentos: [],
            funcionarios: [],
            redirect: false
        }
    }

    componentDidMount() {
        departamentoService.getDepartamentos().then(res =>
            this.setState({
                departamentos: res.data
            }))
            .catch(e => {
                if (e.response.status === 401)
                    window.location.replace("/")
            })
    }

    onChange = () => {
        funcionarioService.getFuncionarioByDepartamentoId(this.refs.departamento.value)
            .then(res => this.setState({
                funcionarios: res.data
            }))
            .catch(e => {
                if (e.response.status === 401)
                    window.location.replace("/")
            })
    }

    novoCusto = () => {
        var custo = {
            DepartamentoId: this.refs.departamento.value,
            FuncionarioId: this.refs.funcionario.value,
            Descricao: this.refs.descricao.value,
            Valor: this.refs.valor.value,
        }

        custoService.novoCusto(custo)
            .then(res =>
                this.props.getMessages(res.data, "ok"))
            .catch(error =>
                this.props.getMessages(error.response.data, "nok")
            )

        //limpa formulário
        this.refs.departamento.value = '';
        this.refs.funcionario.value = ''
        this.refs.descricao.value = '';
        this.refs.valor.value = '';
    }

    render() {
        return (
                       
                <div className="modal fade" id="modalNovoCusto" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Nova Despesa</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Departamento</label>
                                        <select ref='departamento' className='custom-select' onChange={this.onChange} required>
                                            <option value=''>-</option>
                                            {this.state.departamentos.map((value) => {
                                                return (
                                                    <option key={value.Id} value={value.Id}>{value.Nome}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Funcionario</label>
                                        <select ref='funcionario' className='custom-select' required>
                                            <option value=''>-</option>
                                            {this.state.funcionarios.map((value) => {
                                                return (
                                                    <option key={value.Id} value={value.Id}>{value.Nome}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Descrição</label>
                                        <input type="text" ref="descricao" className="form-control" placeholder="Ex.: Caneta" required maxLength="500" />
                                    </div>
                                    <div className="form-group">
                                        <label>Valor</label>
                                        <input type="number" ref="valor" className="form-control" placeholder="Valor do produto" required />
                                    </div>

                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar <i class="fas fa-times-circle text-white"></i></button>
                                    <button type="submit" className="btn btn-primary" onClick={this.novoCusto} data-dismiss="modal">Salvar <i class="fas fa-check text-white"></i></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
           
        )
    }
}

export default NovoCusto;