import api from './Api'

const service = {
    getDepartamentos: () => api.get('Departamento/Get'),
    novoDepartamento: (novoDepartamento) => api.post('Departamento/Create', novoDepartamento)
}

export default service;

