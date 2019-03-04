/*
Componente responsável por exibir mensagens de erro de validação de formulário 
e mensagem de sucesso nos cadastros em geral.
*/

import React, { Component } from 'react';

class ValidationMessages extends Component {      

    render() {
        return (
            <div className="row mt-3">
                {
                    this.props.errors &&
                    <div className="text-danger">
                        <ul>
                            {this.props.errors.map((value, index) =>
                                <li key={index}><b>{value}</b></li>
                            )}
                        </ul>
                    </div>
                }
                {
                    this.props.messages &&
                    <div className="text-success">
                        <ul>
                            <li><b>{this.props.messages}</b></li>
                        </ul>
                    </div>
                }
            </div>
        )
    }


}
export default ValidationMessages;
