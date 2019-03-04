import api from './Api'

const service = {
    getCustos: () => api.get('Custo/Get'),
    getCustoByFuncionarioId: (funcionarioId) => api.get('Custo/GetByFuncionarioId/' + funcionarioId),
    getCustoByDescricao: (descricao) => api.get('Custo/GetByDescricao/' + descricao),
    novoCusto: (novoCusto) => api.post('Custo/Create', novoCusto),
    importarExcel: (file) => api.post('Custo/ImportarExcel', file, configExcel)
}

//usado pra importar planilha excel
const configExcel = {
    headers: {
        'content-type': 'multipart/form-data'
    }
}

export default service;