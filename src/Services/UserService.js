import api from './Api'

const service = {
    login: (user) => api.post('User/Login', user),
    cadastrar: (user) => api.post('User/Cadastrar', user)
}

export default service;
