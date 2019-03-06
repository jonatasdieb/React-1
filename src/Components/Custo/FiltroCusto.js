import React, { Component } from 'react';
import custoService from '../../Services/CustoService';
import funcionarioService from '../../Services/FuncionarioService';
import { logout } from '../../Services/AuthService';

class FiltroCusto extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tipoFiltro: false,
            custoFiltro: [],
        }
    }

    loadCustos() {
        custoService.getCustos()
            .then(res => this.props.filtrarCustos(res.data))
            .catch(e => {
                if (e.response.status === 401)
                    logout()
            })
    }

    loadCustoByDescricao(descricao) {
        custoService.getCustoByDescricao(descricao)
            .then(res => this.props.filtrarCustos(res.data))
            .catch(e => {
                if (e.response.status === 401)
                    logout()
            })
    }

    loadCustoByFuncionarioId(id) {
        custoService.getCustoByFuncionarioId(id)
            .then(res => this.props.filtrarCustos(res.data))
            .catch(e => {
                if (e.response.status === 401)
                    logout()
            })
    }

    loadFuncionarios() {
        funcionarioService.getFuncionarios().then(res => this.setState({
            tipoFiltro: 'funcionario',
            custoFiltro: res.data
        })).catch(e => {
            if (e.response.status === 401)
                logout()
        })
    }

    /*Atualiza campo de pesquisa de acordo
      com tipo de filtro escolhido pelo usuário*/
    onChange = () => {
        if (this.refs.filtro.value === 'descricao') {
            this.setState({
                tipoFiltro: 'descricao'
            })
        }
        else if (this.refs.filtro.value === 'funcionario') {
            this.loadFuncionarios();
        }
    }

    filtrar = (e) => {
        e.preventDefault();

        if (this.state.tipoFiltro === 'funcionario') {
            this.loadCustoByFuncionarioId(this.refs.filtroId.value)
        }
        else if (this.state.tipoFiltro === 'descricao') {

            //se a descricao for vazia, retornará todos os custos
            if (this.refs.descricao.value === '') {
                this.loadCustos();
            } else {
                this.loadCustoByDescricao(this.refs.descricao.value);
            }
        }
        else {
            this.loadCustos();
        }
    }

    render() {
        return (
            <form className='form-inline float-right' onSubmit={this.filtrar}>
                Filtrar por: &nbsp;
            <div className='form-group'>
                    <select ref='filtro' onChange={this.onChange} className='custom-select'>
                        <option> Selecionar </option>
                        <option value="funcionario"> Funcionário </option>
                        <option value="descricao"> Descrição </option>
                    </select>
                </div>
                <div className='form-group'>
                    {
                        this.state.tipoFiltro === 'funcionario' &&
                        <select ref='filtroId' className='custom-select'>
                            {this.state.custoFiltro.map(value =>
                                <option key={value.Id} value={value.Id}> {value.Nome} | {value.Departamento.Nome}</option>
                            )}
                        </select>
                    }
                    {
                        this.state.tipoFiltro === 'descricao' &&
                        <div className='form-group'>
                            <input type='text' ref='descricao' className='form-control' placeholder="Descrição" />
                        </div>
                    }
                </div>&nbsp;
            <button type='submit' className="btn btn-default border-info">Filtrar</button>
            </form>
        )
    }

}

export default FiltroCusto;