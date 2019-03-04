import React, { Component } from 'react'
import FormData from 'form-data';
import custoService from '../../Services/CustoService';
import $ from 'jquery';

class ImportarExcel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }   

    onFormSubmit(e) {
        e.preventDefault();
        this.fileUpload(this.state.file);
    }
    onChange(e) {
        this.setState({ file: e.target.files[0] })
    }

    fileUpload(file) {
        $('#closeModal').click();
        const formData = new FormData();

        formData.append('file', file);

        custoService.importarExcel(formData)
            .then(res =>
                this.props.getMessages(res.data, "ok"))
            .catch(error =>
                this.props.getMessages(error.response.data, "nok")
            );

    }

    render() {
        return (

            <div className="modal fade" id="modalImportarExcel" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content px-2">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Importar despesas do Excel</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <ul>
                            <br />
                            <p><b>Instruções:</b></p>
                            <li>A planilha deve conter os campos ID do Funcionário, Nome, Descrição e Valor, nas colunas das células A, B, C e D, respectivamente.</li>
                            <li>Os dados devem necessariamente iniciar na linha 2.</li>
                            <li>É imprescindível que o ID do Funcionário esteja igual ao cadastrado no sistema. Para ter certeza, consulte tela de cadastro de funcionários.</li>
                            <li>Segue abaixo um exemplo do formato correto a ser importado:</li>
                        </ul>
                        <img src='/img/excel.png' /><br />
                        <form onSubmit={this.onFormSubmit} id="formExcel">
                            <input type="file" onChange={this.onChange} />

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" id="closeModal">Cancelar <i class="fas fa-times-circle text-white"></i></button>
                                <i class="fas fa-upload text-white"> <input type="submit" className="btn btn-primary" value='Enviar' /> </i>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

export default ImportarExcel;