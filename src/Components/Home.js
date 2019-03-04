import React, { Component } from 'react';
import custoService from '../Services/CustoService';
import FiltroCusto from '../Components/Custo/FiltroCusto';
import NovoCusto from './Custo/NovoCusto';
import Messages from '../Features/ValidationMessages';
import ImportarExcel from './Custo/ImportarExcel';
import { logout } from '../Services/AuthService';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            tipoFiltro: false,
            custoFiltro: [],
            custos: [],
            messages: false,
            errors: false
        }
    }

    loadCustos() {
        custoService.getCustos()
            .then(res =>
                this.setState({
                    custos: res.data,
                    tipoFiltro: false,
                    isLoading: false
                })
            )
            .catch(e => {
                if (e.response.status === 401){
                    logout();
                }
                
                this.setState({
                    errors: e.response.data
                })
            })
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        this.loadCustos();
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

        this.loadCustos();

    }

    render() {
        return (
            <div>

                <Messages messages={this.state.messages} errors={this.state.errors} />

                <h3 className="text-center mt-4">Despesas</h3>
                  
              
                    <NovoCusto getMessages={(messages, tipo) => this.showMessages(messages, tipo)} />
                    <ImportarExcel getMessages={(messages, tipo) => this.showMessages(messages, tipo)} />

                   
                    <button type="button" className="btn btn-info" data-toggle="modal" data-target="#modalNovoCusto">
                       Nova <i class="fas fa-plus text-white"></i>
                    </button>
                     &nbsp;
                   
                    <button type="button" className="btn btn-warning text-white" data-toggle="modal" data-target="#modalImportarExcel">
                     Importar <i class="fas fa-upload text-white"></i>
                    </button>
               

                    <FiltroCusto filtrarCustos={(custos) => this.setState({ custos: custos, messages: false, errors: false })} />
              
                <table className='table table-sm table-hover table-light table-bordered mt-2'>
                    <thead className="bg-table text-light">
                        <tr>
                            <th>Funcionário</th>
                            <th>Departamento</th>
                            <th>Descrição</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.custos.map((value) => {
                            return (
                                <tr key={value.Id}>
                                    <td>{value.Funcionario.Nome}</td>
                                    <td>{value.Departamento.Nome}</td>
                                    <td>{value.Descricao}</td>
                                    <td>R$ {value.Valor.toFixed(2)}</td>
                                </tr>
                            )
                        }
                        )}
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

export default Home;